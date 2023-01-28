import * as Sentry from '@sentry/node';
import express from 'express';
import helmet from 'helmet';
import next from 'next';
import { join } from 'path';
import {
  metricsApp,
  metricsRequestMiddleware,
} from './middlewares/metrics.middleware';
import CONFIG from './next.config';
import { cspPolicy } from './security/cspPolicy';
import { redirectsMiddleware } from './utils/redirectsMiddleware';

const NODE_ENV = process.env.NODE_ENV;
const SHOP_ENV = process.env.SHOP_ENV;
const VERSION = process.env.VERSION;
const PORT = process.env.PORT || 3000;
const IS_DEV_ENV = NODE_ENV === 'development';
const IS_PROD_ENV = NODE_ENV === 'production';
const QUIET_MODE = false;
const PROJECT_DIR = './';
const BACKEND_SENTRY_DSN = process.env.BACKEND_SENTRY_DSN || false;
const METRICS_PORT = process.env.METRICS_PORT ?? 3001;
const METRICS_ENABLED = process.env.METRICS_ENABLED === 'true';

// Check for required env vars.
if (!process.env.ECOM_API_ENDPOINT) {
  // tslint:disable-next-line:no-console
  console.error('fatal: ECOM_API_ENDPOINT environment variable is required!');
  process.exit(-1);
}

if (process.env.SHOP_ENV === 'production' && !process.env.DATADOG_API_KEY) {
  // tslint:disable-next-line:no-console
  console.warn('warning: DATADOG_API_KEY environment variable is missing');
}

if (!process.env.OURA_ENV) {
  // tslint:disable-next-line:no-console
  console.warn('warning: OURA_ENV environment variable is missing');
}

const App = next({
  dev: IS_DEV_ENV,
  dir: PROJECT_DIR,
  quiet: QUIET_MODE,
  // @ts-ignore
  conf: CONFIG,
});

App.prepare().then(() => {
  const handle = App.getRequestHandler();
  const server = express();

  if (METRICS_ENABLED) {
    metricsApp.listen(METRICS_PORT);
    server.use(metricsRequestMiddleware);
  }

  if (BACKEND_SENTRY_DSN) {
    Sentry.init({
      dsn: BACKEND_SENTRY_DSN,
      release: VERSION,
      environment: SHOP_ENV,
    });
    server.use(Sentry.Handlers.requestHandler());
  }

  server.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: cspPolicy,
        reportOnly: !IS_PROD_ENV, // Dont show errors in production
      },
    }),
  );

  server.set('trust proxy', true);
  server.set('strict routing', true);

  server.use(redirectsMiddleware());

  /*
   Warning:

   Please don't add more Express based handlers to this section. They don't work
   correctly with locale-based paths. If you want to add an "alias" URL then create
   a renderer file in pages/.

   For an example of an alias path that shows the PDP page, check out:
   pages/discount/[handle]/index.tsx.
   */

  server.get('/shop/discount/:slug', (req, res) => {
    const mergedQuery = Object.assign({}, req.query, req.params);
    // @ts-ignore
    return App.render(req, res, '/product/heritage-silver', mergedQuery);
  });

  server.get('/partners/:ref', (req, res) => {
    const mergedQuery = Object.assign({}, req.query, req.params);
    // @ts-ignore
    return App.render(req, res, '/', mergedQuery);
  });

  server.get('/partnerships/:partnership', (req, res) => {
    const mergedQuery = Object.assign({}, req.query, req.params);
    // @ts-ignore
    return App.render(req, res, '/product/heritage-silver/step1', mergedQuery);
  });

  server.get('/nbaorders/:slug', (req, res) => {
    const mergedQuery = Object.assign({}, req.query, req.params);
    // @ts-ignore
    return App.render(req, res, '/nbavendors', mergedQuery);
  });

  /*
   Warning:

   Please don't add more Express based handlers to this section. They don't work
   correctly with locale-based paths. If you want to add an "alias" URL then create
   a renderer file in pages/.

   For an example of an alias path that shows the PDP page, check out:
   pages/discount/[handle]/index.tsx.
   */

  server.get('*', (req, res) => {
    if (req.url.includes('/sw')) {
      const filePath = join(__dirname, 'static', 'workbox', 'sw.js');
      App.serveStatic(req, res, filePath);
    } else if (req.url.startsWith('static/workbox/')) {
      App.serveStatic(req, res, join(__dirname, req.url));
    } else {
      // @ts-ignore
      return handle(req, res, req.url);
    }
  });

  server.post('*', (req, res) => {
    return handle(req, res);
  });

  if (BACKEND_SENTRY_DSN) {
    server.use(
      Sentry.Handlers.errorHandler({
        shouldHandleError(error) {
          // Capture all 404 and 500 errors
          if (error.status === 404 || error.status === 500) return true;
          return false;
        },
      }),
    );
  }

  const httpServer = server.listen(PORT, (err?: any) => {
    if (err) {
      // tslint:disable-next-line:no-console
      console.log(`> Server now listening on port ${PORT}\n`);
      throw err;
    }
  });

  // See https://adamcrowder.net/posts/node-express-api-and-aws-alb-502/
  httpServer.keepAliveTimeout = 65000;
  httpServer.headersTimeout = 66000;
});
