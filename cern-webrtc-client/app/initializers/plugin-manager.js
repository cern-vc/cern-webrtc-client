import PluginManager from '../services/plugin-manager';
import config from '../config/environment';

export function initialize(application) {
  application.register('plugin-manager:main', PluginManager, {singleton: true});

  // inject our logger so it is availble in controllers, routes, and components
  application.inject('route:application', 'plugin-manager', 'service:plugin-manager');
  application.inject('route:index', 'plugin-manager', 'service:plugin-manager');

  // For testing
  if (config.environment === 'test') {
     application.inject('service:mockup-client', 'plugin-manager', 'service:plugin-manager');
  }

}

export default {
  name: 'plugin-manager',
  initialize: initialize,
};
