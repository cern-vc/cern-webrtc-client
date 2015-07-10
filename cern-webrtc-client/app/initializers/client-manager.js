import ClientManager from '../services/client-manager';

export function initialize(application) {
    // register our logger
    application.register('client-manager:main', ClientManager, {singleton: true});

    // inject our logger so it is availble in controllers, routes, and components
    application.inject('route', 'sharing-manager', 'service:client-manager');
    application.inject('component', 'client-manager', 'service:client-manager');
    application.inject('service:plugin-manager', 'client-manager', 'service:client-manager');
    application.inject('service:vidyo-requests-api', 'client-manager', 'service:client-manager');

}

export default {
  name: 'client-manager',
  initialize: initialize
};
