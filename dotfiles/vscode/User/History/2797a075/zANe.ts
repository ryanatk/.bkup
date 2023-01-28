import {
  CART_ITEMS_CLEAR_REQUEST,
  CART_ITEMS_RELOAD_REQUEST,
  CART_ITEMS_UPDATE_REQUEST,
} from '../types';
import {
  AddToCartRequest,
  Cart as CartRequest,
  RemoveFromCartRequest,
  UpdateCartRequest,
} from './types';

/******************************/
/** Request Actions - SAGAS **/

export const reqUpdateCartItemsAction = ({
  cart,
  variantId,
  variantParentId = null,
  quantity,
  addFreeSizingKit,
  extendedWarrantyId,
}: UpdateCartRequest) => {
  if (variantParentId && typeof variantParentId === 'string') {
    console.warn(
      `reqUpdateCartItemsAction - variantParentId shouldn't be a string`,
    );
    variantParentId = Number(variantParentId);
  }

  if (variantId && typeof variantId === 'string') {
    console.warn(`reqUpdateCartItemsAction - variantId shouldn't be a string`);
    variantId = Number(variantId);
  }
  return {
    type: CART_ITEMS_UPDATE_REQUEST,
    payload: {
      cart,
      variantId,
      variantParentId,
      quantity,
      addFreeSizingKit,
      extendedWarrantyId,
    },
  };
};

export const reqAddCartItemsAction = ({
  cart,
  variantId,
  quantity,
  addFreeSizingKit,
}: AddToCartRequest) => ({
  type: CART_ITEMS_UPDATE_REQUEST,
  payload: { cart, variantId, quantity, addFreeSizingKit },
});

export const reqRemoveCartItemsAction = ({
  cart,
  variantId,
  quantity,
}: RemoveFromCartRequest) => ({
  type: CART_ITEMS_UPDATE_REQUEST,
  payload: { cart, variantId, quantity },
});

export const reqClearCartAction = ({ cart }: CartRequest) => ({
  type: CART_ITEMS_CLEAR_REQUEST,
  payload: { cart },
});

export const reqReloadCartAction = ({ cart }: CartRequest) => ({
  type: CART_ITEMS_RELOAD_REQUEST,
  payload: { cart },
});

export default {
  reqUpdateCartItemsAction,
  reqAddCartItemsAction,
  reqRemoveCartItemsAction,
  reqClearCartAction,
  reqReloadCartAction,
};
