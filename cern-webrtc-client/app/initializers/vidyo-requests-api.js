import VidyoRequestsApi from '../services/vidyo-requests-api';

export function initialize(application) {
    // register our logger
    application.register('vidyo-requests-api:main', VidyoRequestsApi, { singleton: true });

    // inject our logger so it is availble in controllers, routes, and components
    application.inject('component', 'vidyo-requests-api', 'service:vidyo-requests-api');
    application.inject('service:plugin-manager', 'vidyo-requests-api', 'service:vidyo-requests-api');
}

export default {
  name: 'vidyo-requests-api',
  initialize: initialize
};
