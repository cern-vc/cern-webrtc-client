import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
  /**
   * client-manager attrs
   */
  client: Ember.computed.alias('client-manager.client'),

  /**
   * Loads plugin into vidyo.client library with configuration
   * @return {Boolean} true for started and false for not started
   */
  vidyoPluginLoad: function () {
    var vidyoClientObj = null;
    if (config.environment !== 'test') {
      vidyoClientObj = vidyoClient();
      vidyoClientObj.setOutEventCallbackObject(this);
      vidyoClientObj.setDefaultOutEventCallbackMethod(this.vidyoClientCallbacks);
      vidyoClientObj.setLogCallback(console.debug);
      vidyoClientObj.setSessionManager(config["session_manager"]);


      this.set('client', vidyoClientObj);

      if (this.get('client').start()) {
        console.debug("Client started successfully");
      } else {
        console.debug("Client NOT started successfully");
      }

    } else {
      console.debug("Loading mockup-client");
      vidyoClientObj = this.get("client");
      vidyoClientObj.test();

      this.set('client', vidyoClientObj);
    }

    return this.get('client');
  },

  vidyoPluginIsLoaded: function () {
    return this.get('client').isLoaded();
  },

  /**
   * Check start status of Vidyo Client library
   * @return {Boolean} true for started and false for not started
   */
  vidyoPluginIsStarted: function () {
    return this.get('client').isStarted();
  },

  /**
   * At this stage user is connected to the meeting
   */
  meetingActiveCallback(event){
    this.get('connection-manager').setIsConnected(true);
    this.get('connection-manager').setIsJoining(false);
    this.get('connection-manager').setDisconnectedFromServer(false);
    var sessionInfo = this.get('vidyo-requests-api').clientSessionGetInfo();
    this.get('meeting-manager').setSessionInfo(sessionInfo);
  },

  /**
   * Current meeting was ended
   * @param {Object} event Event details
   */
  meetingEndedCallback(event){
    var self = this;
    self.get('connection-manager').setIsConnected(false);
    self.get('connection-manager').meetingEnded(event);
    self.get('client').stop();
  },

  /**
   * Meeting was remotely triggered or connection error
   * @param event
   * @constructor
   */
  callStateCallback(event){
    console.debug("OutEventCallState");
    console.debug(event);

    if (event.fault === "Server unreachable") {
      this.get('connection-manager').setIsJoining(false);
      this.get('connection-manager').setConnectionFault(event.fault);
    }

    if (event.fault === 'ErrorWrongPin' || event.fault === 'ErrorMeetingLocked') {
      console.debug("Wrong PIn");
      this.get('connection-manager').setIsJoining(false);
      this.get('connection-manager').setConnectionFault(event);
    }

    if (event.callState === "Idle") {
      this.get('connection-manager').setIsJoining(false);
      this.get('connection-manager').setDisconnectedFromServer(true);
    }
  },


  /**
   * Number of participants changed
   * @param {Object} event Event details
   */
  participantsChangedCallback(event){
    var self = this;
    console.debug("OutEventParticipantsChanged");
    console.debug(event);
    var participants = this.get('vidyo-requests-api').clientParticipantsGet();
    console.debug("this.get('vidyo-requests-api').clientCurrentUserGet()");
    console.debug(this.get('vidyo-requests-api').clientCurrentUserGet());
    console.debug(this.get('vidyo-requests-api').clientParticipantsGet());
    let  currentMeetingKey = this.get('meeting-manager').get('currentMeetingKey');
    this.get('participants-manager').participantUpdateEventDone(participants,  currentMeetingKey)
      .then(function () {
        // Disable chat for non existing participants
      });
  },
  /**
   * Triggered when changes are detected on the videoconferencing devices
   * @param event
   *
   */
  devicesChangedCallback(event){
    var self = this;
    console.debug("OutEventDevicesChanged");
    console.debug(event);
    var newConfig = this.get('vidyo-requests-api').clientConfigurationGet();
    console.debug("newConfig");
    console.debug(newConfig);
    this.get('configuration-manager').configurationUpdateEventDone(event, newConfig);
  },

  /**
   * Video mute state changed
   * @param event
   * @constructor
   */
  muteVideoCallback(event){
    var self = this;
    console.debug("OutEventMutedVideo");
    console.debug(event);
    self.get('meeting-manager').muteLocalVideo(event);
  },

  /**
   * Received new message to the group chat.
   * @param event
   */
  groupChatCallback(event){
    var self = this;
    console.debug("OutEventGroupChat");
    var  currentMeetingKey = this.get('meeting-manager.currentMeetingKey');
    console.debug(this.get('chat-manager.currentActiveChat'));
    console.debug(this.get('chat-manager').test());
    console.debug("plugin currentActiveChat");
    this.get('chat-manager').chatUpdateDone(event,  currentMeetingKey);
  },

  meetingInfoUpdateCallback(event){
    var self = this;
    console.debug("OutEventConferenceInfoUpdate");
    console.debug(event.eventStatus);
    console.debug("was event");
    if (event.event === "Recording") {
      if (event.eventStatus === true) {
      } else {
      }
    }
  },

  /**
   * New share was added to the meeting
   * @param {Object} event Event details
   */
  addShareCallback(event){
    console.debug('OutEventAddShare');
    var shares = this.get('vidyo-requests-api').clientSharesGet();
    var decrementedNumApp = shares.numApp - 1;
    this.get('sharing-manager').shareUpdateEvent(event, shares);
    this.get('sharing-manager').setIsSharing(true);
    this.get('vidyo-requests-api').clientSharesSetCurrent(decrementedNumApp);
    this.get('sharing-manager').setNumberOfShares(shares.numApp);
  },

  /**
   * Share was removed from the meeting
   * @param {Object} event Event details
   */
  removeShareCallback(event){
    console.debug("OutEventRemoveShare");
    console.debug(event);
    var shares = this.get('vidyo-requests-api').clientSharesGet();
    this.get('sharing-manager').shareUpdateEvent(event, shares);
    this.get('sharing-manager').setNumberOfShares(shares.numApp);
  },

  /**
   * Microphone mute state changed
   * @param {Object} event Event details
   */
  muteAudioInCallback(event){
    console.debug("OutEventMutedAudioIn");
    console.debug(event);
    this.get('meeting-manager').muteLocalMic(event);
  },

  /**
   * Received new message to the private chat.
   * @param event
   * @constructor
   */
  privateChatCallback(event){
    console.debug("OutEventPrivateChat");
    var  currentMeetingKey = this.get('meeting-manager.currentMeetingKey');
    this.get('chat-manager').privateChatUpdate(event, currentMeetingKey);
  },

  /**
   * Speaker mute state changed
   * @param event Event details
   */
  muteAudioOutCallback(event){
    console.debug("OutEventMutedAudioOut");
    console.debug(event);
    this.get('meeting-manager').muteSpeaker(event);
  },

  videoStreamsChangedCallback(event){
    console.debug("OutEventVideoStreamsChanged");
    console.debug(event);
    this.get('meeting-manager').setStreamCount(event.streamCount);
  },

  eventLinkedCallback: function (event) {
    if (event.activeEid === -1) {
      this.get('connection-manager').setIsJoining(false);
      console.debug("disconnected outEventLinked");
      this.get('connection-manager').setDisconnectedFromServer(true);

      switch (event.error) {
        case 500:
          this.get('connection-manager').setConnectionFault({fault: "ErrorIncorrectRoomKey"});
          break;
      }
    }
  },

  /**
   * Main callbacks method
   * @param event
   */
  vidyoClientCallbacks: function (event) {

    console.debug("vidyoClientCallbacks: event");
    console.debug(event);

    if (event.type === 'OutEventLogicStarted') {
      console.debug("Callback Logic started...");
    }

    if (event.type === 'OutEventPluginConnectionSuccess') {
      console.debug("Plugin loaded successfully");
    }

    if (event.type === 'OutEventConferenceActive') {
      this.meetingActiveCallback(event);
    }


    if (event.type === 'OutEventConferenceEnded') {
      this.meetingEndedCallback(event);
    }

    if (event.type === 'callState') {
      this.callStateCallback(event);
    }

    if (event.type === 'OutEventConferenceInfoUpdate') {
      this.meetingInfoUpdateCallback(event);
    }

    if (event.type === 'OutEventDevicesChanged') {
      this.devicesChangedCallback(event);
    }

    if (event.type === 'OutEventParticipantsChanged') {
      this.participantsChangedCallback(event);
    }

    if (event.type === 'OutEventMutedVideo') {
      this.muteVideoCallback(event);
    }


    if (event.type === 'OutEventMutedAudioIn') {
      this.muteAudioInCallback(event);
    }


    if (event.type === 'OutEventMutedAudioOut') {
      this.muteAudioOutCallback(event);
    }

    if (event.type === 'OutEventGroupChat') {
      this.groupChatCallback(event);
    }


    if (event.type === 'OutEventPrivateChat') {
      this.privateChatCallback(event);
    }


    if (event.type === 'OutEventVideoStreamsChanged') {
      this.videoStreamsChangedCallback(event);
    }


    if (event.type === 'OutEventAddShare') {
      this.addShareCallback(event);
    }


    if (event.type === 'OutEventRemoveShare') {
      this.removeShareCallback(event);
    }

    if (event.type === 'OutEventLinked') {
      this.eventLinkedCallback(event);

    }

  }

});
