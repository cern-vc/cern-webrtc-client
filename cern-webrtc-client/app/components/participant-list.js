import Ember from 'ember';
import TrackedComponent from './tracked-component';

export default TrackedComponent.extend({
  /**
   * Connection manager attrs
   */
  isConnected: Ember.computed.alias('connection-manager.isConnected'),
  /**
   * Meeting manager attrs
   */
  sessionInfo: Ember.computed.alias('meeting-manager.sessionInfo'),
  feedbackUrl: Ember.computed.alias('meeting-manager.feedbackUrl'),
  guestName: Ember.computed.alias('meeting-manager.guestName'),
  modalHelpIsOpen: false,
  currentUserId: '',
  previousParticipantsNumber: -1,
  shouldHandleNewParticipants: false,

  isConnectedHandler: function () {
    var self = this;
    this.set('shouldHandleNewParticipants', false);
    Ember.run.later(function () {
      if (self.get('isConnected')) {
        self.get('logger').debug("Setting up shouldHandleNewParticipants ");
        self.set('shouldHandleNewParticipants', true);
      }
    }, 3000);


  }.observes('isConnected'),

  /**
   * Executed when it detects a change on the meeting participants.
   */
  handleParticipantsChange: function () {

    this.handleCurrentUser();

    this.get('logger').debug("previous " + this.get('previousParticipantsNumber') + "new " + this.get('meeting.participants.length'));
    this.get('logger').debug("should handle new participants? " + this.get('shouldHandleNewParticipants'));

    this.updateParticipants();
  }.observes('meeting.participants'),

  /**
   * Sets the current user of the meeting by name
   * TODO: This is not a good solution -an ID would be great- but Vidyo WebRTC does not support this for now.
   */
  handleCurrentUser(){
    var self = this;
    var currentGuestName = this.get('meeting-manager').get('guestName');
    this.get('meeting').get('participants').forEach(function (participant) {
      if (participant.get('name') === currentGuestName) {
        self.set('currentUserId', participant.get('id'));
      }
    });
  },

  /**
   * Displays a message every time a participant joins the meeting and updates the participants number.
   */
  updateParticipants(){
    if (this.get('previousParticipantsNumber') < this.get('meeting.participants.length') && this.get('shouldHandleNewParticipants')) {
      Ember.$('.status-changed.nag').text('A new participant has joined the meeting');
      Ember.$('.status-changed.nag').nag('show');
      Ember.run.later(function () {
        Ember.$('.status-changed.nag').nag('hide');
      }, 2000);
    }
    this.set('previousParticipantsNumber', this.get('meeting.participants.length'));
  },

  /**
   * Initializes the UI
   */
  didInsertElement() {

    Ember.$(".floating.dropdown").dropdown({
      on: "hover"
    });
  },

  actions: {
    /**
     * Action to open a private chat when clicking on a participants name.
     * It will update the UI of the chat-box component.
     * @param participant The participant to start a chat with.
     */
    openPrivateChat(participant) {
      var currentMeetingKey = this.get('meeting-manager').get('currentMeetingKey');
      this.get('chat-manager').activatePrivateChatByParticipant(participant, currentMeetingKey);
      Ember.$("#chatTextName").text(participant.get("name"));
      var isChatVisible = Ember.$('.segment.chat').transition('is visible');
      this.get('logger').debug(isChatVisible);
      if (!isChatVisible) {
        this.get('logger').debug("no visible");
        Ember.$("#hideSidebarButton i").removeClass("left");
        Ember.$("#hideSidebarButton i").addClass("right");
        Ember.$('.segment.chat').transition('fly left');
      }

    }
  }
});
