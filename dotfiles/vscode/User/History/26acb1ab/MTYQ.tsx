import { datadogLogs, LogsEvent } from '@datadog/browser-logs';
import { ThemeProvider } from '@material-ui/core';
import { NextComponentType, NextPageContext } from 'next';
import withRedux from 'next-redux-wrapper';
import { DefaultSeo, NextSeo } from 'next-seo';
import App from 'next/app';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { QueryClientProvider } from 'react-query';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ParallaxProvider } from 'react-scroll-parallax';
import { GlobalStyles } from 'twin.macro';
import DiscountChecker from '../components/pages/_global/DiscountChecker';
import muiTheme from '../components/sormus/material.theme';
import SkipToContent from '../components/sormus/SkipToContent';
import MaintenanceWrapper from '../components/views/MaintenanceWrapper';
import { A11yProvider } from '../contexts/A11yContext';
import { HeaderProvider } from '../contexts/HeaderContext';
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
import { getPreferredLanguage } from '../utils/addURLSubpathForLocale';
import datadogUrlFilter from '../utils/datadogUrlFilter';
import { getEmailTokenCookie } from '../utils/emailTokenCookie';
import { countryCodeForRequest } from '../utils/geo';
import { setCacheHeader } from '../utils/setCacheHeader';
import Utils from '../utils/utils';
import './global-style.scss';

const CookieManager = dynamic(
  () => import('../components/sormus/CookieBanner/CookieManager'),
);

const withReduxDebugMode = false; // process.env.NODE_ENV === 'development' || false

interface DatadogLogsEvent extends LogsEvent {
  accountId?: string;
  emailToken?: string;
}

if (fetchFeatureFlag('logging-enabled') && process.env.DD_CLIENT_TOKEN) {
  datadogLogs.init({
    clientToken: process.env.DD_CLIENT_TOKEN,
    site: 'datadoghq.com',
    forwardErrorsToLogs: true,
    sampleRate: 100,
    env: process.env.OURA_ENV,
    beforeSend: (log: DatadogLogsEvent) => {
      const emailToken = getEmailTokenCookie();
      // discard console errors
      if (log.error?.origin === 'console' || log.error?.origin === 'source') {
        return false;
      }
      // prevent logging during Cypress tests
      if (window.Cypress) {
        return false;
      }
      // prepend accountId to message if it exists
      if (log.accountId) {
        log.message = `${log.accountId} ${log.message}`;
      }
      // add email token to log context if it exists but isn't in the logging context
      if (emailToken && !log.emailToken) {
        log.emailToken = emailToken;
      }
      // remove user token from log's view object
      if (log.view?.referrer) {
        log.view.referrer = datadogUrlFilter(log.view.referrer);
      }
      if (log.view?.url) {
        log.view.url = datadogUrlFilter(log.view.url);
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

/*
 * Check if this page has the 'isSSRSafe' flag, and use client or server rendering.
 */
function CheckSSR({ children, page }) {
  if (page.isSSRSafe) {
    return children as React.ReactElement;
  } else {
    return <ForceCSR>{children}</ForceCSR>;
  }
}

/*
 * This page isn't SSR safe so force the entire thing to render client side.
 */
function ForceCSR({ children }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient) return children as React.ReactElement;

  return null;
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
async function startAxe() {
  // Load these libraries using async import, otherwise they will always be
  // included in the final build.

  const ReactDOM = await import('react-dom');
  const axe = (await import('@axe-core/react')).default;
  axe(React, ReactDOM, 1000);
}

if (
  process.env.ENABLE_A11Y_TEST &&
  typeof window !== 'undefined' && // only run in the browser (not on the server)
  !window.Cypress // don't load this in Cypress testing
) {
  startAxe();
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
      const userAgent = ctx.req.headers['user-agent'];
      const preferredLanguage = getPreferredLanguage(ctx.req);
      await ctx.store.execSagaTask(
        appActions.reqStartupAction({
          isAuthenticated: false,
          countryCode: countryCodeForRequest(
            ctx.req,
            appContext.router,
          ) as string,
          query: ctx.query,
          userAgent,
          preferredLanguage,
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
    console.log({ useStore, isEU });
    Component.meta = (pageProps && pageProps.meta) || Component.meta || {}; // dynamic meta  (dynamically "calculated" in getInitalProps) have precedence over static ones

    return (
      <LocaleProvider>
        <A11yProvider>
          <DefaultSeo {...globalSettings.seo} />
          <NextSeo {...Component.meta.seoParams} />
          <ThemeProvider theme={muiTheme}>
            <Provider store={store}>
              <MaintenanceWrapper>
                <QueryClientProvider client={queryClient}>
                  <ContextProvider>
                    <GlobalStyles />
                    <ParallaxProvider>
                      <HeaderProvider>
                        <CookieManager isEU={isEU} />
                        <SkipToContent />
                        {Component.naked ||
                        (pageProps && pageProps.errorCode) ? (
                          <Component {...pageProps} />
                        ) : (
                          <DiscountChecker>
                            <ContentContainer router={this.props.router}>
                              <CheckSSR page={Component}>
                                <Component
                                  {...pageProps}
                                  globalSettings={globalSettings}
                                />
                              </CheckSSR>
                            </ContentContainer>
                          </DiscountChecker>
                        )}
                      </HeaderProvider>
                    </ParallaxProvider>
                  </ContextProvider>
                </QueryClientProvider>
              </MaintenanceWrapper>
            </Provider>
          </ThemeProvider>
        </A11yProvider>
      </LocaleProvider>
    );
  }
}

export default withRedux(configureStore, {
  VERSION: process.env.VERSION || null,
  debug: withReduxDebugMode,
} as any)(MyApp);
