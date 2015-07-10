import Ember from 'ember';

export default Ember.Service.extend({
  iterator: 0,
  currentActiveChat: null,
  hasUnreadMessages: false,

  setCurrentActiveChat(chat) {
    this.set("currentActiveChat", chat);
  },

  /**
   * Callback method to handle plugin response after posting message to chat
   */
  chatUpdateDone (messageReceived, currentMeetingKey) {
    this.handleGroupChatUpdateDone(messageReceived, currentMeetingKey);
  },
  /**
   * Callback method to handle plugin response after posting message to chat
   */
  privateChatUpdate (messageReceived, currentMeetingKey) {
    this.handlePrivateChatUpdateDone(messageReceived, currentMeetingKey);
  },

  /**
   * Callback method to handle plugin response after posting message to group chat
   */

  handleGroupChatUpdateDone(messageReceived, currentMeetingKey) {
    var self = this;
    var strippedMessage = messageReceived.message.replace(/<(?:.|)*?>/gm, '');
    this.store.find('meeting', currentMeetingKey).then(function (meeting) {
      var mainChat = meeting.get('mainChat');
      var message = self.get('store').createRecord('message', {
        text: strippedMessage,
        sender: messageReceived.displayName,
        chat: mainChat,
        uri: messageReceived.uri
      });
      mainChat.get('messages').addObject(message);

      if (self.get('currentActiveChat').get('id') !== mainChat.get('id')) {
        self.get('logger').debug("Setting unreadMessages to true");
        mainChat.set('hasUnreadMessages', true);
        self.set("hasUnreadMessages", true);
      }
    });

    if (!document.hasFocus()) {
      self.get('logger').debug("Document doesn't have focus");
      var notificationTitle = messageReceived.displayName;
      var notificationBody = strippedMessage.length < 100 ? strippedMessage : strippedMessage.slice(97) + '...';
      this.get('notification-manager').sendDesktopNotification(notificationBody, notificationTitle);
    }
  },

  /**
   * Add message to private chat
   * @params params obect{message, chat, [displayName]}
   */
  addMessageToPrivateChat(params) {
    var message = params.message || '';
    var chat = params.chat || null;
    var participant = params.participant || null;
    var displayName = params.displayName || 'You';
    var participantUri = participant ? participant.get('uri') : '';
    var messageObject = this.store.createRecord('message', {
      text: message,
      sender: displayName,
      chat: chat,
      uri: participantUri
    });

    this.addMessageToChat(messageObject, chat);
  },

  addMessageToChat(message, chat) {
    chat.get('messages').addObject(message);
  },

  /**
   * Callback method to handle plugin response after posting message to private chat
   */
  //todo make it use promise chain
  handlePrivateChatUpdateDone(messageReceived, currentMeetingKey) {
    this.get('logger').debug('handlePrivateChatUpdateDone');
    var message = messageReceived.message || '';
    var strippedMessage = messageReceived.message.replace(/<(?:.|)*?>/gm, '');
    var uri = messageReceived.uri || '';
    var displayName = messageReceived.displayName || '';
    var self = this;
    var designatedChat = null;

    var newMessage = self.store.createRecord('message', {
      text: strippedMessage,
      sender: displayName,
      uri: uri
    });

    this.store.find('meeting', currentMeetingKey).then(function (meeting) {
      var chats = meeting.get('privateChats');
      chats.forEach(function (chat) {
        var participant = chat.get('participant');

        if (participant && (participant.get('uri') === uri)) {
          designatedChat = chat;
          newMessage.set('chat', designatedChat);
          newMessage.set('sender', participant.get('name'));
          designatedChat.get('messages').pushObject(newMessage);

          if (self.get('currentActiveChat').get('uri') !== uri) {
            designatedChat.set('hasUnreadMessages', true);
            self.set("hasUnreadMessages", true);
            designatedChat.set('isVisible', true);
          } else {
            designatedChat.set('hasUnreadMessages', false);
            self.set("hasUnreadMessages", false);
          }
        }
      });
      if (!designatedChat) {
        self.store.find('meeting', currentMeetingKey).then(function (meeting) {
          self.store.findAll('participant').then(function (participants) {
            participants.forEach(function (participant) {
              if (participant.get('uri') === uri) {
                designatedChat = self.createPrivateChat({
                  meeting: meeting,
                  participant: participant,
                  name: participant.get('name'),
                  uri: participant.get('uri')
                });

                if (self.get('currentActiveChat').get('uri') !== participant.get('uri')) {
                  designatedChat.set('hasUnreadMessages', true);
                  self.set("hasUnreadMessages", true);
                }

                meeting.get('privateChats').pushObject(designatedChat);
                newMessage.set('chat', designatedChat);
                newMessage.set('sender', participant.get('name'));
                designatedChat.get('messages').pushObject(newMessage);

              }
            });
          });
        });
      }
    });

    if (!document.hasFocus()) {
      this.get('logger').debug("Document doesn't have focus");
      var notificationTitle = messageReceived.displayName;
      var notificationBody = strippedMessage.length < 100 ? strippedMessage : strippedMessage.slice(97) + '...';
      this.get('notification-manager').sendDesktopNotification(notificationBody, notificationTitle);
    }

  },

  clearGroupMessages() {
    //this.get('store').unloadAll('group-message');
  },

  /**
   * Find (or create) chat by participant and set is as an active chat
   */
  activatePrivateChatByParticipant(participant, currentMeetingKey) {
    this.get('logger').debug('activatePrivateChatByParticipant');
    var self = this;
    var participantChat = null;
    this.store.find('meeting', currentMeetingKey).then(function (meeting) {
      var chats = meeting.get('privateChats');
      chats.forEach(function (chat) {
        if (chat.get('participant') === participant) {
          participantChat = chat;
        }
      });
      if (!participantChat) {
        participantChat = self.createPrivateChat({
          meeting: meeting,
          participant: participant,
          name: participant.get('name'),
          uri: participant.get('uri')
        });
      }
      participantChat.set('hasUnreadMessages', false);
      self.set("hasUnreadMessages", false);
      participantChat.set('isVisible', true);
      self.setChatAsActiveChat(participantChat);
    });
    self.set('shouldExpandFooter', true);
  },

  activatePrivateChatByChat(chat) {
    chat.set('hasUnreadMessages', false);
    this.set("hasUnreadMessages", false);
    this.set("currentActiveChat", chat);
  },

  setChatAsActiveChat(chat) {
    this.set("currentActiveChat", chat);
  },

  createPrivateChat(parameters) {
    var meeting = parameters.meeting || '';
    var participant = parameters.participant || '';
    var name = parameters.name || '';
    var hasUnreadMessages = parameters.hasUnreadMessages || false;
    var uri = parameters.uri || false;
    var isDisabled = parameters.isActive || false;

    return this.store.createRecord('private-chat', {
      meeting: meeting,
      participant: participant,
      name: name,
      uri: uri,
      hasUnreadMessages: hasUnreadMessages,
      isDisabled: isDisabled
    });
  },

  test(){
    return "TEST OK";
  },

  disablePrivateChat(participantUri){
    let self = this;
    this.get('logger').debug("Disabling chats");
    this.store.findAll('private-chat').then(function (chats) {
      self.get('logger').debug("Disabling chats: " + chats.get("length"));
      chats.forEach(function (chat) {
        if (chat.get('uri') === participantUri) {
          self.get('logger').debug("Disabling: " + participantUri);
          chat.set('isDisabled', true);
        }
      });
    });
  }
});
