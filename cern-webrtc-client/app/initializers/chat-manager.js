import ChatManager from '../services/chat-manager';

export function initialize(application) {
  // register our logger
  application.register('chat-manager:main', ChatManager, {singleton: true});

  // inject our logger so it is availble in controllers, routes, and components
  application.inject('route', 'chat-manager', 'service:chat-manager');
  application.inject('component', 'chat-manager', 'service:chat-manager');
  application.inject('service:plugin-manager', 'chat-manager', 'service:chat-manager');
  application.inject('service:meeting-manager', 'chat-manager', 'service:chat-manager');
  application.inject('service:participants-manager', 'chat-manager', 'service:chat-manager');
  application.inject('service:chat-manager', 'store', 'service:store');
}

export default {
  name: 'chat-manager',
  initialize: initialize
};
