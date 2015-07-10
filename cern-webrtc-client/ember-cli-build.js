/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var emberAppConfig = require('./config/environment.js');

module.exports = function(defaults) {

  var app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: ['app/styles']
    },
    fingerprint: {
      enabled: emberAppConfig(EmberApp.env()).isMinify,
      exclude: ['cern_small_notification', 'favicon']
    },
    dotEnv: {
      clientAllowedKeys: [
        'ROOT_URL',
        'SENTRY_DSN',
        'BACKEND_SERVER_URL',
        'OAUTH2_API_KEY',
        'OAUTH2_REDIRECT_URL',
        'PIWIK_ID',
        'PIWIK_URL',
        'SESSION_MANAGER',
        'VIDYO_PORTAL_URL',
        'FEEDBACK_URL'
      ],
      path: {
        development: './config/envs/.env',
        test: './config/envs/.env.test',
        production: './config/envs/.env.production',
        qa: './config/envs/.env.qa'
      }
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  /**
   * EXTERNAL CSS
   */
  app.import('app/styles/cern-toolbar.css');
  app.import('app/styles/vendor/ui/range.css');

  /**
   * EXTERNAL JAVASCRIPT MODULES
   */
  app.import('vendor/vidyo/vidyo.client.messages.js');
  app.import('vendor/vidyo/vidyo.client.private.messages.js');
  app.import('vendor/vidyo/vidyo.client.js');
  app.import('vendor/ui/range.js');


  app.import('bower_components/detectrtc/DetectRTC.js');
  app.import('bower_components/chance/dist/chance.min.js');


  return app.toTree();
};
