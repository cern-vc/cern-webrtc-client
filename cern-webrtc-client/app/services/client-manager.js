import Ember from 'ember';
import config from '../config/environment';

/**
 * This service will provide access to the Vidyo plugin and Vidyo client to the other classes.
 * This variables are initialized in the plugin-manager service when the application loads.
 */
export default Ember.Service.extend({
  // plugin: null,
  client: null,
  init: function () {
    this._super(...arguments);

    if (config.environment === 'test') {
      this.get('logger').debug("Init client manager in test mode");
      // this.set('plugin', true);
      this.set('client', Ember.inject.service('mockup-client'));
    }
  }
});
