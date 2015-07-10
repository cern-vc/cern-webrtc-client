import MeetingManager from '../services/meeting-manager';

export function initialize(application) {
  // register our logger
  application.register('meeting-manager:main', MeetingManager, {singleton: true});

  // inject our logger so it is availble in controllers, routes, and components
  application.inject('route', 'meeting-manager', 'service:meeting-manager');
  application.inject('component', 'meeting-manager', 'service:meeting-manager');
  application.inject('service:plugin-manager', 'meeting-manager', 'service:meeting-manager');
  application.inject('service:meeting-manager', 'store', 'service:store');
}

export default {
  name: 'meeting-manager',
  initialize: initialize
};
