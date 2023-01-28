import { all, call, put, select, take } from 'redux-saga/effects';
import {
  sendAnalyticsEvent,
  sendGA4Event,
  sendGTMEvent,
  sendGTMWithGA4Event,
  sendSegmentTrack,
} from '../../analytics';
import { Payload } from '../../analytics/types';
import { fetchFeatureFlags } from '../../queries/FeaturesConfig';
import BrazeService from '../../services/brazeService';
import CartService from '../../services/cartService';
import GeolocationService from '../../services/geolocationService';
import ProductService from '../../services/productService';
import State from '../../types/State';
import Utils from '../../utils/utils';
import {
  ANALYTICS_EVENT_ERROR,
  ANALYTICS_EVENT_REQUEST,
  ANALYTICS_GA4_EVENT_ERROR,
  ANALYTICS_GA4_EVENT_REQUEST,
  ANALYTICS_GTM_EVENT_ERROR,
  ANALYTICS_GTM_EVENT_REQUEST,
  ANALYTICS_GTM_GA4_EVENT_ERROR,
  ANALYTICS_GTM_GA4_EVENT_REQUEST,
  ANALYTICS_SEGMENT_EVENT_ERROR,
  ANALYTICS_SEGMENT_EVENT_REQUEST,
  APP_GEOLOCATION,
  APP_GEOLOCATION_ERROR,
  APP_GEOLOCATION_REQUEST,
  APP_SET_FEATURE_FLAGS,
  APP_SET_PREFERRED_LANG,
  APP_SET_USER_AGENT,
  APP_STARTLOADING,
  APP_STARTUP_ERROR,
  APP_STARTUP_REQUEST,
  APP_STOPLOADING,
  APP_UPDATECOUNTRY,
  APP_UPDATECOUNTRY_ERROR,
  APP_UPDATECOUNTRY_REQUEST,
  APP_UPDATE_BILLING_COUNTRY,
  APP_UPDATE_BILLING_COUNTRY_ERROR,
  APP_UPDATE_BILLING_COUNTRY_REQUEST,
  BRAZE_SUBMIT,
  BRAZE_SUBMIT_ERROR,
  BRAZE_SUBMIT_REQUEST,
  BRAZE_SUBMIT_RESET,
  BRAZE_SUBMIT_RESET_REQUEST,
  CART_ITEMS_RELOAD_REQUEST,
  CART_RELOAD,
} from '../types';
import { StartUpRequest } from './types';

// @TODO: Address 'any' types in follow up PR. Remove any unused.
const getApp = (state: State) => state.app;
const getCart = (state: State) => state.cart;

type App = ReturnType<typeof getApp>;
type Cart = ReturnType<typeof getCart>;

function* startup(payload: StartUpRequest) {
  try {
    yield call(getGeolocation, payload.countryCode);

    // query feature flags and add them to app state
    const flags: App = yield call(fetchFeatureFlags);
    yield put({
      type: APP_SET_FEATURE_FLAGS,
      payload: flags,
    });
    yield put({
      type: APP_SET_USER_AGENT,
      payload: payload.userAgent,
    });
    yield put({
      type: APP_SET_PREFERRED_LANG,
      payload: payload.preferredLanguage,
    });
  } catch (err) {
    const errors = err.payload || err;
    yield put({ type: APP_STARTUP_ERROR, payload: errors });
  }
}

function* getGeolocation(countryCode: string) {
  // if (process.env.LOCAL_OVERRIDE_COUNTRY) {
  //   yield put({ type: APP_GEOLOCATION, payload: response });
  // }

  try {
    const geolocationService = GeolocationService();
    const response: App = yield call(
      geolocationService.getGeolocation,
      countryCode,
    );
    console.log({ response });
    if (response.error) {
      yield put({
        type: APP_GEOLOCATION_ERROR,
        payload:
          'Geolocation could not be determined - using standard currency (USD)',
      });
    }

    // dispatch success action to app reducer
    yield put({ type: APP_GEOLOCATION, payload: response });
  } catch (err) {
    const errors = err.payload || err;
    yield put({ type: APP_GEOLOCATION_ERROR, payload: errors });
  }
}

function* updateCountry({ country }: { country: string }) {
  try {
    const selectedCountry = Utils.getSellToCountry(country);

    yield put({ type: APP_UPDATECOUNTRY, payload: selectedCountry });

    const state = yield select((state) => state);
    const productService = ProductService(state);
    const products = yield call(
      productService.getAllProducts,
      true,
      selectedCountry,
    );
    const cartService = CartService(state);
    const cartResponse: Cart = yield call(cartService.reloadCart, products);
    yield put({ type: CART_RELOAD, payload: cartResponse });
  } catch (err) {
    const errors = err.payload || err;
    yield put({ type: APP_UPDATECOUNTRY_ERROR, payload: errors });
  }
}

function* updateBillingCountrySaga({ country }: { country: string }) {
  try {
    const selectedCountry = Utils.getSellToCountry(country);

    yield put({ type: APP_UPDATE_BILLING_COUNTRY, payload: selectedCountry });
  } catch (err) {
    const errors = err.payload || err;
    yield put({ type: APP_UPDATE_BILLING_COUNTRY_ERROR, payload: errors });
  }
}

function* analyticsEventSaga({ type, payload }: Payload) {
  try {
    const state = yield select((state) => state);
    const typePayload = {
      type,
      payload,
    };
    yield call(sendAnalyticsEvent, typePayload, state);
  } catch (err) {
    const errors = err.payload || err;
    yield put({ type: ANALYTICS_EVENT_ERROR, payload: errors });
  }
}

function* ga4EventSaga({ type, payload }: Payload) {
  try {
    const state = yield select((state) => state);
    const typePayload = {
      type,
      payload,
    };

    yield call(sendGA4Event, typePayload, state);
  } catch (err) {
    const errors = err.payload || err;
    yield put({ type: ANALYTICS_GA4_EVENT_ERROR, payload: errors });
  }
}

function* gtmWithGA4Saga({ type, payload }: Payload) {
  try {
    const state = yield select((state) => state);
    const typePayload = {
      type,
      payload,
    };

    yield call(sendGTMWithGA4Event, typePayload, state);
  } catch (err) {
    const errors = err.payload || err;
    yield put({ type: ANALYTICS_GTM_GA4_EVENT_ERROR, payload: errors });
  }
}

function* gtmEventSaga({ type, payload }: Payload) {
  try {
    const state = yield select((state) => state);
    const typePayload = {
      type,
      payload,
    };

    yield call(sendGTMEvent, typePayload, state);
  } catch (err) {
    const errors = err.payload || err;
    yield put({ type: ANALYTICS_GTM_EVENT_ERROR, payload: errors });
  }
}

function* segmentEventSaga({ type, payload }: Payload) {
  try {
    const state = yield select((state) => state);
    const typePayload = {
      type,
      payload,
    };
    yield call(sendSegmentTrack, typePayload, state);
  } catch (err) {
    const errors = err.payload || err;
    yield put({ type: ANALYTICS_SEGMENT_EVENT_ERROR, payload: errors });
  }
}

// Submit Braze Email
// not currently used
function* submitBrazeEmail(payload: any) {
  try {
    const brazeService = BrazeService();
    const response: App = yield call(brazeService.submitEmail, payload);
    yield put({ type: BRAZE_SUBMIT, payload: response });
  } catch (err) {
    const errors = err.payload || err;
    yield put({ type: BRAZE_SUBMIT_ERROR, payload: errors });
  }
}

// Reset Braze Email
function* resetBrazeEmail() {
  try {
    yield put({ type: BRAZE_SUBMIT_RESET });
  } catch (err) {
    const errors = err.payload || err;
    yield put({ type: BRAZE_SUBMIT_ERROR, payload: errors });
  }
}

/*
 * Startup flow to allow concurrent actions to be dispatched
 */
function* startupFlow() {
  while (true) {
    // watching for authentication actions
    const action = yield take([
      ANALYTICS_EVENT_REQUEST,
      ANALYTICS_GA4_EVENT_REQUEST,
      ANALYTICS_GTM_EVENT_REQUEST,
      ANALYTICS_GTM_GA4_EVENT_REQUEST,
      ANALYTICS_SEGMENT_EVENT_REQUEST,
      APP_STARTUP_REQUEST,
      APP_GEOLOCATION_REQUEST,
      APP_UPDATECOUNTRY_REQUEST,
      APP_UPDATE_BILLING_COUNTRY_REQUEST,
      BRAZE_SUBMIT_REQUEST,
      BRAZE_SUBMIT_RESET_REQUEST,
    ]);

    if (action.type === APP_STARTUP_REQUEST) {
      yield put({ type: APP_STARTLOADING });
      yield call(startup, action.payload);
    }

    if (action.type === APP_GEOLOCATION_REQUEST) {
      yield call(getGeolocation, action.payload);
    }

    if (action.type === APP_UPDATECOUNTRY_REQUEST) {
      yield put({ type: APP_STARTLOADING });
      yield call(updateCountry, action.payload);

      // Update cart prices in case the currency has changed
      yield put({ type: CART_ITEMS_RELOAD_REQUEST });
    }

    if (action.type === APP_UPDATE_BILLING_COUNTRY_REQUEST) {
      yield put({ type: APP_STARTLOADING });
      yield call(updateBillingCountrySaga, action.payload);
    }

    if (action.type === ANALYTICS_GA4_EVENT_REQUEST) {
      yield call(ga4EventSaga, action.payload);
    }

    if (action.type === ANALYTICS_GTM_EVENT_REQUEST) {
      yield call(gtmEventSaga, action.payload);
    }

    if (action.type === ANALYTICS_GTM_GA4_EVENT_REQUEST) {
      yield call(gtmWithGA4Saga, action.payload);
    }

    if (action.type === ANALYTICS_EVENT_REQUEST) {
      yield call(analyticsEventSaga, action.payload);
    }

    if (action.type === ANALYTICS_SEGMENT_EVENT_REQUEST) {
      yield call(segmentEventSaga, action.payload);
    }

    if (action.type === BRAZE_SUBMIT_REQUEST) {
      yield call(submitBrazeEmail, action.payload);
    }
    if (action.type === BRAZE_SUBMIT_RESET_REQUEST) {
      yield call(resetBrazeEmail);
    }

    yield put({ type: APP_STOPLOADING });

    yield action;
  }
}

export default function* AppSagas() {
  yield all([startupFlow()]);
}
