import ConfigurationManager from '../services/configuration-manager';


export function initialize(application) {
    // register our logger
    application.register('configuration-manager:main', ConfigurationManager, { singleton: true });

    // inject our logger so it is availble in controllers, routes, and components
    application.inject('route', 'configuration-manager', 'service:configuration-manager');
    application.inject('component', 'configuration-manager', 'service:configuration-manager');
    application.inject('service:plugin-manager', 'configuration-manager', 'service:configuration-manager');
    application.inject('controller:index', 'configuration-manager', 'service:configuration-manager');
}

export default {
  name: 'configuration-manager',
  initialize: initialize
};
