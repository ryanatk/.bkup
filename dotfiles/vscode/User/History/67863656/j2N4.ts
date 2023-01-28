import * as Sentry from '@sentry/node';
import { v4 } from 'uuid';
import { SIZING_KIT_DISCOUNT } from '../consts/discounts';
import { SIZINGKIT_SKU } from '../consts/skus';
import { fetchRecalculateLineItems } from '../queries/RecalculateLineItems';
import { INITIAL_STATE } from '../stores/cart/initialState';
import CartState, { CartLineItem } from '../types/CartState';
import State from '../types/State';
import { isARing, isHardware } from '../utils/cart/cartCount';
import { fetchValidDiscountForProduct } from '../utils/discounts/fetchDiscount';
import {
  EXTENDED_WARRANTY_REPLACEMENT_2YEAR,
  EXTENDED_WARRANTY_REPLACEMENT_3YEAR,
  UPGRADER_2022_GEN3,
} from '../utils/getBilboCohort';
import { logToDataDogServer } from '../utils/logToDatadog';
import {
  DiscountValue,
  getDiscount,
  getDiscountCampaign,
  getDiscounts,
  updateCartProductPrices,
} from './helpers/cartHelpers';
import ProductService from './productService';

const sizingKitId = 21266804768822;
const subscriptionId = 21266804768825;
const sizeLaterValue = 'Size later';

export default function CartService(state: State) {
  const productService = ProductService(state);

  async function addItemsToCart({
    cart,
    variantId,
    variantParentId = null,
    quantity,
    addFreeSizingKit = false,
    extendedWarrantyId = null,
    updatingExistingLineItem = false,
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

      // let isExistingParent = updatingExistingLineItem;
      // if (!isExistingParent) {
      //   // only "chargers" that are already in the cart are "existing parents"
      //   isExistingParent =
      //     lineItem &&
      //     isCharger(lineItem) &&
      //     (await fetchFeatureFlag('enable-multi-line-items'));
      // }

      // Create a parent Id for a ring or charger
      // const parentId = isExistingParent
      //   ? lineItem.parentId
      //   : Math.random().toString(36).substr(2, 9);
      const parentId = v4().substring(2, 9);

      //Add a top-level product (Ring or Charger)
      const newProduct = await formatLineItem(
        {
          variantId,
          quantity,
        },
        productDiscountFormatted || false,
        lineItem.parentId,
      );

      // if (isExistingParent) {
      //   newCart.lineItems.splice(lineItemIndex, 1, newProduct);
      // } else {
      newCart.lineItems.push(newProduct);
      // }

      //If top-level product is a Ring, add child line items as needed
      if (isARing(newProduct)) {
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
          discountCampaign?.campaign === EXTENDED_WARRANTY_REPLACEMENT_3YEAR ||
          discountCampaign?.campaign === UPGRADER_2022_GEN3;
        const subscription = await formatLineItem(
          { variantId: subscriptionId, quantity: 1 },
          false,
          parentId,
        );
        if (!isReplacementFlow && !updatingExistingLineItem) {
          newCart.lineItems.push(subscription);
        }
        if (
          newProduct.selectedOptions.find(
            (option) => option.value === sizeLaterValue,
          ) &&
          !newCart.lineItems.find((item) => item.sku === SIZINGKIT_SKU)
        ) {
          logToDataDogServer(
            'cart',
            'No sizing kit added to cart even though ring is unsized.',
            { cart },
          );
        }
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

  async function reloadCart(products = []) {
    if (
      !state.cart ||
      !state.cart.lineItems ||
      !Array.isArray(state.cart.lineItems)
    ) {
      return { ...INITIAL_STATE };
    }
    // if passed with a product query
    // update prices based on new product list
    if (products.length > 0) {
      const newLineItems = updateCartProductPrices(
        products,
        state.cart.lineItems,
      );
      return updateCartTotals({ ...state.cart, lineItems: newLineItems });
    }
    return updateCartTotals(state.cart);
  }

  function calculateCartTotal(cart) {
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
    const totalCount = 0;
    const currency = state.app?.currency;
    const totalPrice = await calculateCartTotal(newCart);

    const recalculated = await fetchRecalculateLineItems({
      currency,
      cart: {
        lineItems: (newCart.lineItems || []).map((lineItem) => {
          return {
            skuCode: lineItem.sku,
            quantity: lineItem.quantity,
          };
        }),
        discountCodes: state.discounts?.lineItemsDiscounts || [],
      },
    });

    if (recalculated.resultCategory !== 'success') {
      console.log('recalculation result failed:', recalculated);
      throw new Error(
        recalculated.errorMessage || 'Error updating cart prices',
      );
    }

    // Take response data and write it into our local state.
    const responseLineItems = recalculated.lineItems;

    for (let index = 0; index < responseLineItems.length; index++) {
      const responseLineItem = responseLineItems[index];
      const localLineItem = newCart.lineItems[index];

      if (responseLineItem.skuCode !== localLineItem.sku) {
        console.error(
          'Data mismatch with recalculateLineItems response (cartService):',
          {
            responseLineItem,
            localLineItem,
          },
        );
        continue;
      }

      localLineItem.productId = parseFloat(responseLineItem.shopifyProductId);
      localLineItem.unitPrice = responseLineItem.unitPrice;
      localLineItem.price = responseLineItem.totalOriginalPrice;
      localLineItem.totalDiscountPrice =
        responseLineItem.totalOriginalPrice -
        responseLineItem.totalDiscountedPrice;
    }

    newCart.totalPrice = recalculated.totalOriginalPrice;
    newCart.cartDiscount = 0;
    newCart.totalDiscount =
      recalculated.totalOriginalPrice - recalculated.totalDiscountedPrice;
    newCart.totalPriceAfterDiscount = recalculated.totalDiscountedPrice;
    newCart.totalCount = recalculated.totalCount;
    return newCart;
  }

  async function formatLineItem(
    product,
    discount: DiscountValue | false = false,
    parentId = null,
  ) {
    const lineItem = await productService.getProductAsLineItem({
      variantId: product.variantId,
      productType: product.productType,
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
