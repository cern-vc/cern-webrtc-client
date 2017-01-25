/* jshint node: true */

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'cern-webrtc-client',
    environment: environment,
    rootURL: process.env.ROOT_URL,
    locationType: 'auto',
    version: "0.14.0",
    session_manager: process.env.SESSION_MANAGER,
    backend_server_url: process.env.BACKEND_SERVER_URL,
    vidyo_portal_url: process.env.VIDYO_PORTAL_URL,
    feedback_url: process.env.FEEDBACK_URL,
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    metricsAdapters: [
      {
        name: 'Piwik',
        environments: ['development', 'production'],
        config: {
          piwik_id: process.env.PIWIK_ID,
          url: 'https://piwik.web.cern.ch/piwik.js'
        }
      }
    ],
    torii: {
      providers: {
        'cern-oauth2': {
          remoteServiceName: 'iframe',
          scope: 'bio',
          response_type: 'code',
          apiKey: process.env.OAUTH2_API_KEY,
          redirectUri: process.env.OAUTH2_CALLBACK_URL
        }
      }
    },
    i18n: {
      defaultLocale: 'en'
    }
  };

  if (environment === 'development') {
    ENV.isMinify = false;
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.sentry = {
      dsn: process.env.SENTRY_DSN,
      cdn: process.env.SENTRY_CDN,
      development: true,
      debug: true
    };
  }

  if (environment === 'test') {
    ENV.isMinify = false;
    // Testem prefers this...
    ENV.rootURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV['ember-cli-mirage'] = {
      enabled: true
    };
    ENV.sentry = {
      dsn: process.env.SENTRY_DSN,
      cdn: process.env.SENTRY_CDN,
      development: true,
      debug: false
    };
  }

  if (environment === 'qa') {
    ENV.isMinify = false;
    ENV.sentry = {
      dsn: process.env.SENTRY_DSN,
      cdn: process.env.SENTRY_CDN,
      development: false,
      debug: true
    };
  }

  if (environment === 'production') {
    ENV.isMinify = true;
    ENV.sentry = {
      dsn: process.env.SENTRY_DSN,
      cdn: process.env.SENTRY_CDN,
      development: false,
      debug: true
    };
  }

  return ENV;
};
