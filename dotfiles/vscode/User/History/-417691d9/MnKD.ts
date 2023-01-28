import * as Sentry from '@sentry/node';
import { all, call, put, select, take } from 'redux-saga/effects';
import CartService from '../../services/cartService';
import State from '../../types/State';
import {
  CART_ERROR,
  CART_ITEMS_CLEAR_REQUEST,
  CART_ITEMS_RELOAD_REQUEST,
  CART_ITEMS_UPDATED,
  CART_ITEMS_UPDATE_REQUEST,
  CART_RELOAD_REQUEST,
  CART_STARTLOADING,
  CART_STOPLOADING,
} from '../types';
import { UpdateCartRequest } from './types';

const getCart = (state: State) => state.cart;
type Cart = ReturnType<typeof getCart>;

// Add new item to cart
function* updateItemsToCartSaga(payload: UpdateCartRequest) {
  try {
    const state: State = yield select((state) => state);
    const cartService = CartService(state);

    const response: Cart =
      payload.quantity > 0
        ? yield call(cartService.addItemsToCart, payload)
        : yield call(cartService.removeItemsFromCart, payload);

    // dispatch saga internal action add items to cart
    yield put({ type: CART_ITEMS_UPDATED, payload: response });
  } catch (error) {
    error.sentryWhitelist = true;
    Sentry.addBreadcrumb({ message: 'error in updateItemsToCartSaga' });
    Sentry.captureException(error);

    yield put({ type: CART_ERROR, payload: error });
  }
}

//
function* clearCartSaga() {
  try {
    const state: State = yield select((state) => state);
    const cartService = CartService(state);

    const response: Cart = yield call(cartService.emptyCart);

    // dispatch saga internal action add items to cart
    yield put({ type: CART_ITEMS_UPDATED, payload: response });
  } catch (errors) {
    console.log('CART ERROR :: ', errors);
    yield put({ type: CART_ERROR, payload: errors });
  }
}

function* reloadCartSaga() {
  try {
    const state: State = yield select((state) => state);
    const cartService = CartService(state);

    const response: Cart = yield call(cartService.reloadCart);
    yield put({ type: CART_ITEMS_UPDATED, payload: response });
  } catch (errors) {
    console.log('CART ERROR :: ', errors);
    yield put({ type: CART_ERROR, payload: errors });
  }
}

/*
 * Startup flow to allow concurrent actions to be dispatched
 */
function* cartFlow() {
  while (true) {
    const action = yield take([
      CART_ITEMS_UPDATE_REQUEST,
      CART_RELOAD_REQUEST,
      CART_ITEMS_CLEAR_REQUEST,
      CART_ITEMS_RELOAD_REQUEST,
    ]);

    // console.log('CARTFLOW STARTED ', action.type )
    yield put({ type: CART_STARTLOADING });

    if (action.type === CART_ITEMS_UPDATE_REQUEST) {
      yield call(updateItemsToCartSaga, action.payload);
    }

    if (action.type === CART_RELOAD_REQUEST) {
      yield call(reloadCartSaga);
    }

    if (action.type === CART_ITEMS_CLEAR_REQUEST) {
      yield call(clearCartSaga);
    }

    if (action.type === CART_ITEMS_RELOAD_REQUEST) {
      yield call(reloadCartSaga);
    }

    yield put({ type: CART_STOPLOADING });

    yield action;
  }
}

//
export default function* CartSagas() {
  yield all([cartFlow()]);
}
