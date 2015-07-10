import ParticipantsManager from '../services/participants-manager';

export function initialize(application) {
    // register our logger
    application.register('participants-manager:main', ParticipantsManager, {singleton: true});

    // inject our logger so it is availble in controllers, routes, and components
    application.inject('route', 'participants-manager', 'service:participants-manager');
    application.inject('component', 'participants-manager', 'service:participants-manager');
    application.inject('service:plugin-manager', 'participants-manager', 'service:participants-manager');
    application.inject('service:participants-manager', 'store', 'service:store');
}

export default {
    name: 'participants-manager',
    initialize: initialize
};
