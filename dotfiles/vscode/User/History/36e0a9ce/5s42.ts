/*
 * Application reducer
 * We use immutableJS to ensure immutability on the application { ...statelevel.
 */
import { AnyAction } from 'redux';
import AppState from '../../types/AppState';
import {
  APP_ADD_FEATURE_FLAG,
  APP_GEOLOCATION,
  APP_GEOLOCATION_ERROR,
  APP_SET_FEATURE_FLAGS,
  APP_SET_PREFERRED_LANG,
  APP_SET_USER_AGENT,
  APP_STARTLOADING,
  APP_STARTUP_ERROR,
  APP_STARTUP_LOADED,
  APP_STOPLOADING,
  APP_UPDATECOUNTRY,
  APP_UPDATECOUNTRY_ERROR,
  APP_UPDATE_BILLING_COUNTRY,
  BRAZE_SUBMIT,
  BRAZE_SUBMIT_RESET,
} from '../types';
import { INITIAL_STATE } from './initialState';

// !!!! never change the original state!
const reducers = (
  state: AppState = INITIAL_STATE,
  action: AnyAction,
): AppState => {
  switch (action.type) {
    case APP_STARTUP_LOADED:
      return {
        ...state,
        // isLoading: false,
        isLoaded: true,
        error: null,
      };

    case APP_STARTUP_ERROR:
      return {
        ...state,
        error: action.payload,
        errorSource: APP_STARTUP_ERROR,
        isLoading: false,
      };

    case APP_GEOLOCATION:
      return {
        ...state,
        geo: true,
        currency: action.payload.currency,
        countryCode: action.payload.countryCode,
        isEuCountry: action.payload.eu,
        regions: action.payload.regions,
        error: null,
      };

    case APP_GEOLOCATION_ERROR:
      return {
        ...state,
        isLoading: false,
        geo: false,
      };

    case APP_UPDATECOUNTRY:
      return {
        ...state,
        countryCode: action.payload.countryCode,
        currency: action.payload.currency,
        isEuCountry: action.payload.eu,
        regions: action.payload.regions,
        error: null,
      };

    case APP_UPDATECOUNTRY_ERROR:
      return {
        ...state,
        error: action.payload,
        errorSource: APP_UPDATECOUNTRY_ERROR,
        isLoading: false,
      };

    case APP_UPDATE_BILLING_COUNTRY:
      return {
        ...state,
        billingRegions: action.payload.regions,
        // isLoading: false,
        error: null,
      };

    case BRAZE_SUBMIT:
      return {
        ...state,
        brazeMessage: action.payload,
        isLoading: false,
      };

    case BRAZE_SUBMIT_RESET:
      return {
        ...state,
        brazeMessage: false,
      };

    case APP_STARTLOADING:
      return { ...state, isLoading: true };

    case APP_STOPLOADING:
      return { ...state, isLoading: false };

    case APP_SET_FEATURE_FLAGS:
      return { ...state, flags: action.payload };

    case APP_ADD_FEATURE_FLAG:
      const { key, value } = action.payload;
      return {
        ...state,
        flags: {
          ...state.flags,
          [key]: value,
        },
      };

    case APP_SET_USER_AGENT:
      return { ...state, userAgent: action.payload };

    case APP_SET_PREFERRED_LANG:
      return { ...state, preferredLanguage: action.payload };

    default:
      return state;
  }
};

export default reducers;
