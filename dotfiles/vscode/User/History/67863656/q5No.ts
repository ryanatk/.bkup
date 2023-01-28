import * as Sentry from '@sentry/node';
import { SIZING_KIT_DISCOUNT } from '../consts/discounts';
import { fetchValidDiscountForProduct } from '../helpers/discounts/fetchDiscount';
import { fetchFeatureFlag } from '../queries/FeaturesConfig';
import { INITIAL_STATE } from '../stores/cart/initialState';
import CartState, { CartLineItem } from '../types/CartState';
import State from '../types/State';
import { isARing, isCharger, isHardware } from '../utils/cartCount';
import {
  EXTENDED_WARRANTY_REPLACEMENT_2YEAR,
  EXTENDED_WARRANTY_REPLACEMENT_3YEAR,
} from '../utils/getBilboCohort';
import {
  checkSizingKitRemovalPermission,
  DiscountValue,
  enforceOnePerOrderDiscounts,
  getDiscount,
  getDiscountCampaign,
  getDiscounts,
} from './helpers/cartHelpers';
import ProductService from './productService';

const sizingKitId = 21266804768822;
const subscriptionId = 21266804768825;

export default function CartService(state: State) {
  const productService = ProductService(state);

  async function addItemsToCart({
    cart,
    variantId,
    variantParentId = null,
    quantity,
    addFreeSizingKit = false,
    extendedWarrantyId = null,
  }) {
    try {
      const newCart: CartState = { ...cart };

      // Create a cart ID if, empty
      if (newCart.lineItems.length === 0) {
        const cartId = Math.random().toString(36).substr(2, 9);
        newCart.cartId = cartId;
      }
      //Add discounts to cart if any
      newCart.discounts = await getDiscounts(state);
      //Apply discounts, if any
      const foundDiscount = await getApplicableDiscountForNewLineItem({
        variantId,
        quantity,
        parentProductId: variantParentId,
        lineItemDiscounts: state.discounts.lineItemsDiscounts,
      });
      const productDiscountFormatted: DiscountValue | false =
        foundDiscount.productDiscountFormatted;

      // find the current line item
      const lineItemIndex = cart.lineItems.findIndex(
        ({ id }) => id === variantId,
      );
      const lineItem = cart.lineItems[lineItemIndex];

      console.log(
        "fetchFeatureFlag('enable-charger-quantity')",
        fetchFeatureFlag('enable-charger-quantity'),
      );

      // only "chargers" that are already in the cart are "existing parents"
      const isExistingParent =
        lineItem &&
        fetchFeatureFlag('enable-charger-quantity') &&
        isCharger(lineItem);

      // Create a parent Id for a ring or charger
      const parentId = isExistingParent
        ? lineItem.parentId
        : Math.random().toString(36).substr(2, 9);

      //Add a top-level product (Ring or Charger)
      const newProduct = await formatLineItem(
        {
          variantId,
          quantity,
        },
        productDiscountFormatted || false,
        parentId,
      );

      if (isExistingParent) {
        newCart.lineItems.splice(lineItemIndex, 1, newProduct);
      } else {
        newCart.lineItems.push(newProduct);
      }

      //If top-level product is a Ring, add child line items as needed
      if (isARing(newProduct)) {
        //special case to remove sizing kit if discount requires it
        if (await checkSizingKitRemovalPermission(newCart)) {
          addFreeSizingKit = false;
        }
        //Add sizing kit
        if (addFreeSizingKit) {
          const sizingKitDiscountObject = await getDiscount(
            SIZING_KIT_DISCOUNT,
            null,
            state,
          );
          const freeSizingKitLineItem = await formatLineItem(
            { variantId: sizingKitId, quantity: 1 },
            sizingKitDiscountObject,
            parentId,
          );
          newCart.lineItems.push(freeSizingKitLineItem);
        }
        //Add extended warranty
        if (extendedWarrantyId) {
          const extendedWarranty = await formatLineItem(
            { variantId: extendedWarrantyId, quantity: 1 },
            false,
            parentId,
          );
          newCart.lineItems.push(extendedWarranty);
        }
        //Add membership except if replacement flow
        const discountCampaign =
          newCart.discounts.length > 0 &&
          (await getDiscountCampaign(newCart.discounts[0].code, state));
        const isReplacementFlow =
          discountCampaign?.campaign === EXTENDED_WARRANTY_REPLACEMENT_2YEAR ||
          discountCampaign?.campaign === EXTENDED_WARRANTY_REPLACEMENT_3YEAR;
        const subscription = await formatLineItem(
          { variantId: subscriptionId, quantity: 1 },
          false,
          parentId,
        );
        !isReplacementFlow && newCart.lineItems.push(subscription);
      }
      await updateCartTotals(newCart);
      return newCart;
    } catch (error) {
      console.error(error);
      Sentry.addBreadcrumb({
        message: 'error in cartService.addItemsToCart',
      });
      Sentry.captureException(error);

      throw error;
    }
  }

  async function removeItemsFromCart({ cart, variantId }) {
    try {
      let lineItems: CartLineItem[];
      // if the item is a parent (ring/charger), remove associated children
      const lineItemToRemove: CartLineItem = cart.lineItems.find(
        (item) => item.id === variantId,
      );
      if (isHardware(lineItemToRemove)) {
        const parentId = lineItemToRemove.parentId;
        lineItems = cart.lineItems.filter((item) => item.parentId !== parentId);
      } else {
        lineItems = cart.lineItems.filter((item) => item.id !== variantId);
      }
      const newCart: CartState = { ...cart, lineItems };
      await updateCartTotals(newCart);
      return newCart;
    } catch (error) {
      console.error(error);
      Sentry.addBreadcrumb({
        message: 'error in cartService.removeItemsFromCart',
      });
      Sentry.captureException(error);
      throw error;
    }
  }

  async function reloadCart() {
    if (
      !state.cart ||
      !state.cart.lineItems ||
      !Array.isArray(state.cart.lineItems)
    ) {
      return { ...INITIAL_STATE };
    }
    return await updateCartTotals(state.cart);
  }

  async function calculateCartTotal(cart) {
    return cart.lineItems.reduce(
      (totalPrice, { price }) => totalPrice + price,
      0,
    );
  }

  function emptyCart() {
    const newCart = { ...state.cart };
    newCart.lineItems = [];
    newCart.totalPrice = 0;
    newCart.totalCount = 0;
    newCart.discounts = [];
    newCart.error = null;
    newCart.cartDiscount = false;
    newCart.totalPriceAfterDiscount = 0;
    newCart.totalDiscount = 0;

    return newCart;
  }

  async function updateCartTotals(newCart: CartState) {
    let totalCount = 0;
    const totalPrice = await calculateCartTotal(newCart);
    let totalDiscount = 0;
    let subtotal = 0;
    const currency = state.app?.currency;
    await enforceOnePerOrderDiscounts({ cart: newCart, currency });

    newCart.lineItems.some(function (item) {
      totalCount += item.quantity;
      subtotal +=
        item.price > item.totalDiscountPrice
          ? item.price - item.totalDiscountPrice
          : 0;
      totalDiscount += item.totalDiscountPrice;
    });

    // Apply cart level discounts
    newCart.cartDiscount = 0;
    newCart.totalDiscount = totalDiscount + newCart.cartDiscount;
    newCart.totalPriceAfterDiscount =
      subtotal > newCart.cartDiscount ? subtotal - newCart.cartDiscount : 0;

    newCart.totalPrice = totalPrice;
    newCart.totalCount = totalCount;

    // Detect if 100% off value was displayed
    if (newCart.cartDiscount >= newCart.totalPrice) {
      newCart.totalPriceAfterDiscount = 0;
      newCart.totalDiscount = newCart.cartDiscount;
    }
    return newCart;
  }

  async function formatLineItem(
    product,
    discount: DiscountValue | false = false,
    parentId = null,
  ) {
    const lineItem = await productService.getProductAsLineItem({
      variantId: product.variantId,
      quantity: product.quantity,
      discount: discount as any,
      parentId,
    });
    return lineItem;
  }

  // Find the discount that can be applied (if any) when adding this variantId as a new line item.
  async function getApplicableDiscountForNewLineItem({
    variantId,
    quantity,
    parentProductId,
    lineItemDiscounts,
  }): Promise<{
    productDiscountCode: string | false;
    productDiscountFormatted: DiscountValue | false;
  }> {
    const { matchingDiscount } = await fetchValidDiscountForProduct(
      lineItemDiscounts,
      parentProductId,
      { currencyCode: state.app.currency },
    );
    if (!matchingDiscount) {
      return {
        productDiscountCode: false,
        productDiscountFormatted: false,
      };
    }

    const productDiscountCode: string | false = matchingDiscount.title
      ? matchingDiscount.title
      : false;
    if (!productDiscountCode) {
      return {
        productDiscountCode: false,
        productDiscountFormatted: false,
      };
    }

    const productPriceObject = await formatLineItem(
      { variantId, quantity },
      false,
    );
    const productDiscountFormatted = await getDiscount(
      productDiscountCode,
      productPriceObject.price,
      state,
    );

    return {
      productDiscountCode,
      productDiscountFormatted,
    };
  }

  return {
    addItemsToCart,
    removeItemsFromCart,
    emptyCart,
    calculateCartTotal,
    reloadCart,
  };
}
