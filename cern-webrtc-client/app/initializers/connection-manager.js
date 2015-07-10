import ConnectionManager from '../services/connection-manager';
import config from '../config/environment';

export function initialize(application) {
  // register our logger
  application.register('connection-manager:main', ConnectionManager, {singleton: true});

  // inject our logger so it is availble in controllers, routes, and components
  application.inject('route', 'connection-manager', 'service:connection-manager');
  application.inject('component', 'connection-manager', 'service:connection-manager');
  application.inject('controller', 'connection-manager', 'service:connection-manager');
  application.inject('service:plugin-manager', 'connection-manager', 'service:connection-manager');

  // For testing
  if (config.environment === 'test') {
    application.inject('service:mockup-event-helper', 'connection-manager', 'service:connection-manager');
  }

}

export default {
  name: 'connection-manager',
  initialize: initialize,
};
