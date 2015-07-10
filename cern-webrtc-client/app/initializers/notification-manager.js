import NotificationManager from '../services/notification-manager';

export function initialize(application) {
  application.register('notification-manager:main', NotificationManager, { singleton: true });
  application.inject('component', 'notification-manager', 'service:notification-manager');
  application.inject('service:participants-manager', 'notification-manager', 'service:notification-manager');
  application.inject('service:chat-manager', 'notification-manager', 'service:notification-manager');
}

export default {
  name: 'notification-manager',
  initialize: initialize
};
