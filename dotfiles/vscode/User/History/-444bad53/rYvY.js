/**
 * Set and export Next configurations with PWA optimizations (workbox/webpack)
 **/

const dotEnvResult = require('dotenv').config();
const webpack = require('webpack');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

// Specify which URLs to allow CSP (Content Security Policy) on
if (process.env.NODE_ENV === 'development') {
  process.traceDeprecation = true;
}

const nextConfig = {
  poweredByHeader: false,
  crossOrigin: 'anonymous',
  i18n: {
    locales: ['en', 'eu', 'us', 'fi', 'de'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  // target: 'serverless',
  webpack: (config, { isServer, dev }) => {
    config.node = { fs: 'empty', net: 'empty', tls: 'empty' };

    if (dev) {
      config.devtool = 'eval-source-map';
    }

    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false,
              },
            },
            titleProp: true,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    });

    // Here goes env that are available in the client side
    config.plugins.push(
      new webpack.EnvironmentPlugin(
        [
          'VERSION',
          'ROOT_URL',
          'IMGIX_DOMAIN',
          'IMGIX_SECRET',
          'ECOM_API_ENDPOINT',
          'OURA_ENV',
          'LOCAL_ENV',
          'FRONTEND_SENTRY_SAMPLE_RATE',
          'BACKEND_SENTRY_DSN',
          'FRONTEND_SENTRY_DSN',
          'GOOGLE_PLACES_APIKEY',
          'ZUORA_HOSTED_PAGE_URL',
          'PAYPAL_MERCHANT_ID',
          'SEGMENT_KEY',
          'DD_CLIENT_TOKEN',
          'KOUNT_HOSTNAME',
          'KOUNT_CLIENTID',
        ].filter((name) => !!process.env[name]),
      ),
    );
    if (
      process.env.OURA_ENV !== ('development' || 'bilbo') &&
      process.env.CIRCLE_STAGE !== 'build-check' &&
      process.env.SENTRY_AUTHKEY
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          // sentry-cli configuration
          authToken: process.env.SENTRY_AUTHKEY,
          org: 'ouraring-ltd',
          project: 'ecomm-ourafront-frontend',
          // webpack specific configuration
          include: '.next',
          ignore: ['node_modules'],
          urlPrefix: '~/_next',
          release:
            'ourafront-' + process.env.OURA_ENV + '@' + process.env.VERSION,
        }),
      );
    }

    return config;
  },

  env: {
    ...dotEnvResult,
  },
};

module.exports = nextConfig;
