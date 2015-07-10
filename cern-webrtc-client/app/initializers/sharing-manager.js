import SharingManager from '../services/sharing-manager';

export function initialize(application) {
    // register our logger
    application.register('sharing-manager:main', SharingManager, {singleton: true});

    // inject our logger so it is availble in controllers, routes, and components
    application.inject('route', 'sharing-manager', 'service:sharing-manager');
    application.inject('component', 'sharing-manager', 'service:sharing-manager');
    application.inject('service:plugin-manager', 'sharing-manager', 'service:sharing-manager');
}

export default {
  name: 'sharing-manager',
  initialize: initialize
};
