import { RING_SIZES, RING_SKUS } from '../../consts/ring';
import { SUBSCRIPTION_SKU } from '../../consts/skus';
import { fetchDiscount } from '../../queries/GetOneDiscount';
import { SIZING_KIT_ID } from '../../stores/constants';
import CartState, { CartLineItem } from '../../types/CartState';
import logToDatadog from '../../utils/logToDatadog';
export interface DiscountValue {
  code: string;
  value: number;
}
export async function checkSizingKitRemovalPermission(discounts) {
  //fetch and check that if there is discount in cart that has flag
  for (const discount of discounts) {
    if (!discount || !discount.code) continue; // Ignore any invalid discounts
    const resp = await fetchDiscount({
      discountCode: discount.code,
      currencyCode: null,
    });
    if (resp.discount.skipSizingStep) return true;
  }
  return false;
}

/**
 * Get rings in cart
 */
export const getRingsInCart = (lineItems: CartLineItem[]) =>
  lineItems.filter((lineItem: CartLineItem) =>
    RING_SKUS.includes(lineItem.sku),
  );

/**
 * Check if sizing kit already in cart
 */
const isSizingKitInCart = (cart: CartState): boolean =>
  cart?.lineItems?.some((item) => parseFloat(item.id) === SIZING_KIT_ID) ||
  false;

/**
 * Check if membership already in cart
 */
export const isMembershipInCart = (cart: CartState): boolean =>
  cart?.lineItems?.some((item) => item.sku === SUBSCRIPTION_SKU) || false;

/**
 * Get rings in cart with a selected size (e.g. not size later)
 */
export const getRingsInCartWithSelectedSize = (
  lineItems: CartLineItem[],
): CartLineItem[] =>
  getRingsInCart(lineItems).filter((lineItem: CartLineItem) =>
    lineItem.selectedOptions.some(
      (selectionOption) =>
        selectionOption.name === 'Size' &&
        RING_SIZES.includes(selectionOption.value),
    ),
  );

/**
 * Get items associated with a parent id
 */
export const getItemsInCartWithParentId = (
  lineItems: CartLineItem[],
  parentId,
): CartLineItem[] =>
  lineItems.filter((lineItem: CartLineItem) => lineItem.parentId === parentId);

/**
 * Get total number of rings in cart
 */
export const totalRingsInCart = (lineItems: CartLineItem[]): number =>
  getRingsInCart(lineItems).length;

/**
 * Get discount
 */
export async function getDiscount(
  id,
  lineItemPrice: number | false = false,
  state,
): Promise<DiscountValue | false> {
  const { discount } = await fetchDiscount({
    discountCode: id,
    currencyCode: state.app.currency,
  });

  if (discount && discount.valid) {
    let price = await discountTotalValue(discount, state);
    if (lineItemPrice) {
      price = await discountTotalValue(discount, state, false, lineItemPrice);
    }
    return {
      code: discount.title,
      value: price,
    };
  }
  return false;
}

/**
 * Get total discount value
 */
export async function discountTotalValue(
  discount,
  state,
  cartLevel = false,
  price = null,
) {
  let total = 0;
  const cartTotalPrice = state.cart.totalPrice;

  // Percentage
  if (discount.discountType === 'DiscountPercentage') {
    if (cartLevel) {
      total = (parseFloat(discount.discountPercentage) / 100) * cartTotalPrice;
    } else if (price !== null) {
      total = (parseFloat(discount.discountPercentage) / 100) * price;
    }
  }
  // Dollar amount
  if (discount.discountType === 'DiscountAmount') {
    total = parseFloat(discount.discountAmount.amount);
  }
  return total;
}

/**
 * One per order discounts
 */
export async function enforceOnePerOrderDiscounts({
  cart,
  currency = 'USD',
}: {
  cart: CartState;
  currency?: string;
}) {
  const alreadyUsingCodes = {};

  for (const lineItem of cart.lineItems) {
    if (lineItem.discounts && lineItem.discounts.code) {
      const code = lineItem.discounts.code;
      const { discount } = await fetchDiscount({
        discountCode: code,
        currencyCode: currency,
      });

      if (!discount) {
        logToDatadog(
          'cart',
          'enforceOnePerOrderDiscounts failed to fetch discount code: ' + code,
        );
        continue;
      }

      if (discount.appliesOncePerCustomer) {
        if (alreadyUsingCodes[code]) {
          // This code was already used by a different line item, zero out this line item.
          lineItem.discounts = false;
          lineItem.totalDiscountPrice = 0;
        } else if (
          lineItem.quantity > 1 &&
          discount.discountType === 'DiscountAmount'
        ) {
          // Multiple quantity, but the discount can only be used once.
          lineItem.totalDiscountPrice = Math.min(
            lineItem.totalDiscountPrice,
            discount.discountAmount.amount,
          );
        }
      }

      alreadyUsingCodes[code] = true;
    }
  }
}

export async function getDiscountCampaign(id, state) {
  const { discount } = await fetchDiscount({
    discountCode: id,
    currencyCode: state.app.currency,
  });
  if (discount?.valid && discount?.campaign) {
    return {
      campaign: discount.campaign,
    };
  } else return null;
}

//
// NOTE: Returns a full list of current discount codes
export async function getDiscounts(state) {
  return state.discounts.lineItemsDiscounts
    .map(async (code) => await getDiscount(code, false, state))
    .filter((discount) => discount); // filter out any `false` values
}
