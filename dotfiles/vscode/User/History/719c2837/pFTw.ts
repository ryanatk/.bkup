import { defineConfig } from 'cypress';

export default defineConfig({
  fixturesFolder: 'tests/cypress/fixtures',
  screenshotsFolder: 'tests/cypress/screenshots',
  videosFolder: 'tests/cypress/videos',
  defaultCommandTimeout: 15000,
  requestTimeout: 15000,
  projectId: 'ms87yf',
  chromeWebSecurity: false,
  scrollBehavior: 'center',
  env: {
    baseUrl: 'https://ecom.ourastage.com',
    subscription_amount_us: '5.99',
    subscription_amount_eu: '5.99',
    subscription_amount_rest: '6.99',
    mobileViewportWidth: 460,
    mobileViewportHeight: 780,
  },
  blockHosts: ['.qualtrics.com'],
  viewportWidth: 1920,
  viewportHeight: 1080,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mochawesome, mocha-junit-reporter',
    mochawesomeReporterOptions: {
      consoleReporter: 'spec',
      reportDir: 'tests/cypress/results',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      timestamp: 'yymmddHHMMssL',
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: 'tests/cypress/results/junit/results-[hash].xml',
    },
  },
  screenshotOnRunFailure: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./tests/cypress/plugins')(on, config);
    },
    specPattern: 'tests/cypress/integration/**/*.{js,jsx,ts,tsx}',
    supportFile: 'tests/cypress/support/index.js',
    baseUrl: 'https://ecom.ourastage.com',
    excludeSpecPattern: ['**/utils/*.js', '**/mocks/*.js'],
  },
});
