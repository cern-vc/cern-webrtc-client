import MockupClient from '../services/mockup-client';

export function initialize(application) {
    // register our logger
    application.register('mockup-client:main', MockupClient, { singleton: true });
}

export default {
    name: 'mockup-event-helper',
    initialize: initialize,
};
