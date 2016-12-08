import Ember from 'ember';
import TrackedComponent from '../tracked-component';

export default TrackedComponent.extend({
  isConnected: Ember.computed.alias('connection-manager.isConnected'),
  client: Ember.computed.alias('client-manager.client'),
  numberOfMessages: Ember.computed.alias('activeChat.messages.count'),
  chats: Ember.computed.alias('meeting.chats'),
  activeChat: Ember.computed.alias('chat-manager.currentActiveChat'),
  hasUnreadMessages: Ember.computed.alias('chat-manager.hasUnreadMessages'),

  /**
   * Will trigger when a new message arrives to the current active chat.
   */
  scrollOnNewMessageReceived: function () {
    var self = this;
    Ember.run.later(function () {
      self.scrollDownMessageList();
      console.debug("Message received");
    }, 50);
  }.observes('numberOfMessages'),

  /**
   * Initializes the dropdown.
   */
  didInsertElement(){
    Ember.$('.dropdown.button').dropdown();
  },

  /**
   * Scrolls down the message list
   */
  scrollDownMessageList(){
    var messagesList = Ember.$('#messages-list-scrollable');
    var height = messagesList[0].scrollHeight;
    console.debug("Scrolling: " + height);
    messagesList.scrollTop(height);
    messagesList.animate({scrollTop: messagesList.prop("scrollHeight")}, 300);
  },

  actions: {
    /**
     * Hides or shows the chat
     */
    showHideChat(){
      var isChatVisible = Ember.$('.segment.chat').transition('is visible');
      console.debug(isChatVisible);
      if (isChatVisible) {
        console.debug("visible");
        Ember.$("#hideSidebarButton i").removeClass("right");
        Ember.$("#hideSidebarButton i").addClass("left");
      } else {
        console.debug("no visible");
        Ember.$("#hideSidebarButton i").removeClass("left");
        Ember.$("#hideSidebarButton i").addClass("right");
      }
      Ember.$('.segment.chat').transition('fly left');
    },

    /**
     * Action triggered to send a new message to the current active chat
     */
    chatSendMessage: function () {
      this._trackEvent('chat-box', 'chatSendMessage');
      var currentChat = this.get('activeChat');
      this.get('meeting').get('mainChat').get('id');
      currentChat.get('id');
      if (currentChat.get('id') === this.get('meeting').get('mainChat').get('id')) {
        this.send('sendGroupMessage');
      } else {
        this.send('sendPrivateMessage');
      }
      this.scrollDownMessageList();
    },

    /**
     * Sends a message to the current meeting chat
     */
    sendGroupMessage() {
      var message = this.get('messageText');
      if (message.length > 0) {
        this.get('vidyo-requests-api').clientGroupChatSend(message);
        var currentMeetingKey = this.get('meeting-manager.currentMeetingKey');
        this.get('chat-manager').chatUpdateDone({message: message, displayName: "You"}, currentMeetingKey);
        this.set("messageText", "");
      }
    },

    /**
     * Sends a mesage to the current private chat
     */
    sendPrivateMessage() {
      var message = this.get('messageText');
      var chat = this.get('activeChat');
      var participant = chat.get('participant');
      var params = {};
      if (message.length > 0 && participant) {
        if (!participant.get('uri')) {
          //todo
          console.error('user has no URI address');
          return;
        }
        params = {
          message: message,
          uri: participant.get('uri')
        };
        this.get('vidyo-requests-api').clientPrivateChatSend(params);
        this.get('chat-manager').addMessageToPrivateChat({
          message: message,
          chat: chat,
          participant: participant,
          displayName: "You"
        });
        this.set("messageText", "");
      }
    },

    /**
     * Sets as active the selected chat
     * @param chat Chat to set as active
     */
    setChatAsActiveChat(chat) {
      console.debug("Set active chat: " + chat.get("name"));
      chat.set('isVisible', true);
      chat.set('hasUnreadMessages', false);
      this.set('hasUnreadMessages', false);
      this.get('chat-manager').setCurrentActiveChat(chat);
      this.scrollDownMessageList();
    },

    /**
     * Make chat disappear from the lists of chats in the component
     */

    closeChat(chat) {
      console.debug("Closing chat: " + chat.get("name"));
      chat.set('isVisible', false);
      this.get('chat-manager').setCurrentActiveChat(this.get('meeting').get('mainChat'));
    }
  }
});
