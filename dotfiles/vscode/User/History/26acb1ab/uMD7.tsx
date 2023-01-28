import { datadogLogs } from '@datadog/browser-logs';
import { ThemeProvider } from '@material-ui/core';
import { NextComponentType, NextPageContext } from 'next';
import withRedux from 'next-redux-wrapper';
import { DefaultSeo, NextSeo } from 'next-seo';
import App from 'next/app';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { GlobalStyles } from 'twin.macro';
import DiscountChecker from '../components/pages/_global/DiscountChecker';
import { EyebrowCTAProvider } from '../components/sormus/EyebrowCTA/EyebrowCTAProvider';
import muiTheme from '../components/sormus/material.theme';
import MaintenanceWrapper from '../components/views/MaintenanceWrapper';
import fetchGlobalSettings from '../data-mock/api/fetch-global-settings';
import Analytics from '../helpers/analytics';
import queryClient from '../helpers/queryClient';
import { LocaleProvider } from '../public/locales/LocaleContext';
import { fetchFeatureFlag } from '../queries/FeaturesConfig';
import appActions from '../stores/app/actions';
import { getAppDataSelector } from '../stores/app/selectors';
import { reqUpdateCheckoutRegion } from '../stores/checkout/actions';
import configureStore from '../stores/configureStore';
import ExtraPageComponentOptions from '../types/ExtraPageComponentOptions';
import { countryCodeForRequest } from '../utils/geo';
import { setCacheHeader } from '../utils/setCacheHeader';
import Utils from '../utils/utils';
import './global-style.scss';

const CookieManager = dynamic(
  () => import('../components/sormus/CookieBanner/CookieManager'),
);

const withReduxDebugMode = false; // process.env.NODE_ENV === 'development' || false

if (fetchFeatureFlag('logging-enabled') && process.env.DD_CLIENT_TOKEN) {
  datadogLogs.init({
    clientToken: process.env.DD_CLIENT_TOKEN,
    site: 'datadoghq.com',
    forwardErrorsToLogs: true,
    sampleRate: 100,
    beforeSend: (log) => {
      // discard console errors
      if (log.error.origin === 'console' || log.error.origin === 'source') {
        return false;
      }
    },
  });
}

function ContentContainer({ children, router }) {
  const dispatch = useDispatch();
  const app = useSelector(getAppDataSelector);

  useEffect(() => {
    let region = 'US';
    if (router.locale) {
      region = Utils.getRegionForOrder(app.countryCode);
    }
    dispatch(reqUpdateCheckoutRegion(region));
  }, [router]);

  return <div>{children}</div>;
}

type OuraPageComponent = NextComponentType & ExtraPageComponentOptions;

interface MyAppInitialProps {
  Component: OuraPageComponent;
  store: any;
  globalSettings: any;
}

interface MyAppState {
  topMessageVisible?: boolean;
  history?: any;
}

type OuraPageContext = NextPageContext & {
  isServer?: boolean;
  store?: any;
  meta?: any;
};

const PassThroughWrapper = ({ children }) => <>{children}</>;

// Axe a11y testing engine (feedback shows in browser console)
// https://github.com/dequelabs/axe-core
if (process.env.NODE_ENV === 'development' && window) {
  const ReactDOM = require('react-dom');
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

export class MyApp extends App<MyAppInitialProps, {}, MyAppState> {
  analytics: Analytics;

  constructor(props) {
    super(props);
    this.analytics = new Analytics(this);
    this.state = { history: [], topMessageVisible: true };
  }

  static async getInitialProps(appContext) {
    const ctx: OuraPageContext = appContext.ctx;
    const Component: OuraPageComponent = appContext.Component;

    if (ctx.isServer) {
      setCacheHeader(ctx.req, ctx.res);

      await ctx.store.execSagaTask(
        appActions.reqStartupAction({
          isAuthenticated: false,
          countryCode: countryCodeForRequest(
            ctx.req,
            appContext.router,
          ) as string,
          query: ctx.query,
        }),
      );
    }

    // Add 'locale' to the context data that the component receives in getInitialProps.
    // This is being added Next.js (see https://github.com/vercel/next.js/pull/21930)
    // but it's not part of our Next version yet.
    const ctxForComponent: any = {
      ...ctx,
      locale: appContext.router && appContext.router.locale,
    };
    const pageProps: { meta?: any } = Component.getInitialProps
      ? await Component.getInitialProps(ctxForComponent)
      : {};
    if (pageProps && pageProps.meta) {
      Component.meta = pageProps.meta;
    }

    return { pageProps };
  }

  componentWillUnmount() {
    this.analytics.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    const { history } = this.state;
    const { asPath } = this.props.router;

    if (history[history.length - 1] !== asPath) {
      this.setState((prevState) => ({
        history: [...prevState.history, asPath],
      }));
      const historyList = this.state.history;
      if (historyList.length > 0) {
        const lastVisited = historyList[historyList.length - 1];
      }
    }
  }

  async componentDidMount() {
    this.analytics.start();

    const { asPath } = this.props.router;

    this.setState((prevState) => ({ history: [...prevState.history, asPath] }));
    this.topMessageCallback = this.topMessageCallback.bind(this);
  }

  // Close top message banner
  topMessageCallback() {
    this.setState({ topMessageVisible: false });
  }

  render() {
    const { Component, pageProps, store } = this.props;
    const ContextProvider = Component.provider || PassThroughWrapper;

    const globalSettings = fetchGlobalSettings();

    // Use The Current State Country Code
    const useStore = store.getState();

    const isEU = useStore && useStore.app ? useStore.app.isEuCountry : 'false';
    Component.meta = (pageProps && pageProps.meta) || Component.meta || {}; // dynamic meta  (dynamically "calculated" in getInitalProps) have precedence over static ones

    return (
      <LocaleProvider>
        <DefaultSeo {...globalSettings.seo} />
        <NextSeo {...Component.meta.seoParams} />
        <ThemeProvider theme={muiTheme}>
          <Provider store={store}>
            <MaintenanceWrapper>
              <QueryClientProvider client={queryClient}>
                <ContextProvider>
                  <GlobalStyles />
                  <EyebrowCTAProvider>
                    {Component.naked || (pageProps && pageProps.errorCode) ? (
                      <Component {...pageProps} />
                    ) : (
                      <DiscountChecker>
                        <ContentContainer router={this.props.router}>
                          <Component
                            {...pageProps}
                            globalSettings={globalSettings}
                          />
                          <CookieManager isEU={isEU} />
                        </ContentContainer>
                      </DiscountChecker>
                    )}
                  </EyebrowCTAProvider>
                </ContextProvider>
              </QueryClientProvider>
            </MaintenanceWrapper>
          </Provider>
        </ThemeProvider>
      </LocaleProvider>
    );
  }
}

export default withRedux(configureStore, {
  VERSION: process.env.VERSION || null,
  debug: withReduxDebugMode,
} as any)(MyApp);
