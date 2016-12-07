import Ember from 'ember';

export default Ember.Service.extend({
  client: Ember.computed.alias('client-manager.client'),

  /**
   * Mute local camera. Other participants will not see the user.
   * @param  {Boolean} mute true - mute, false - unmute
   * @return {Object} Application object
   */
  clientVideoMute: function (mute) {
    var params = {}, inEvent, msg;
    params.willMute = mute;
    inEvent = vidyoClientMessages.inEventMuteVideo(params);
    if (this.get('client').sendEvent(inEvent)) {
      msg = "VidyoWeb sent " + inEvent.type + " event successfully";
    } else {
      msg = "VidyoWeb did not send " + inEvent.type + " event successfully!";
    }
    console.debug(msg);
  },

  /**
   * Mute local microphone
   * @param  {Boolean} mute true - mute, false - unmute
   * @return {Object} Application object
   */
  clientMicrophoneMute: function (mute) {
    var params = {}, inEvent, msg;
    params.willMute = mute;
    inEvent = vidyoClientMessages
      .inEventMuteAudioIn(params);
    if (this.get('client').sendEvent(inEvent)) {
      msg = "VidyoWeb sent " + inEvent.type + " event successfully";
    } else {
      msg = "VidyoWeb did not send " + inEvent.type + " event successfully!";
    }
    console.debug(msg);

  },

  /**
   * Mute local audio output device
   * @param  {Boolean} mute true - mute, false - unmute
   * @return {Object} Application object
   */
  clientSpeakerMute: function (mute) {
    var params = {}, inEvent, msg;
    params.willMute = mute;
    inEvent = vidyoClientMessages.inEventMuteAudioOut(params);
    if (this.get('client').sendEvent(inEvent)) {
      msg = "VidyoWeb sent " + inEvent.type + " event successfully";
    } else {
      msg = "VidyoWeb did not send " + inEvent.type + " event successfully!";
    }
    console.debug(msg);
  },

  /**
   * Change the self view mode.
   * @param previewMode
   */
  clientPreviewModeSet: function (previewMode) {
    var params = {}, inEvent, msg;
    params.previewMode = previewMode;

    inEvent = vidyoClientMessages.eventPreview(params);
    if (this.get('client').sendEvent(inEvent)) {
      msg = "VidyoWeb sent " + inEvent.type + " event successfully";
    } else {
      msg = "VidyoWeb did not send " + inEvent.type + " event successfully!";
    }
    console.debug(msg);
  },

  /**
   * Set number of preferred participants.
   * Preferred participants will be shown in the larger area.
   * @param  {Integer} numPreferred Number of preferred participants.
   * @return {Object} Application object
   */
  clientLayoutSet: function (numPreferred) {
    var params = {}, inEvent, msg;
    params.numPreferred = numPreferred;

    inEvent = vidyoClientMessages.inEventLayout(params);
    if (this.get('client').sendEvent(inEvent)) {
      msg = "VidyoWeb sent " + inEvent.type + " event successfully";
    } else {
      msg = "VidyoWeb did not send " + inEvent.type + " event successfully!";
    }
    console.debug(msg);
    this.set('numPreferredParticipants', params.numPreferred);
  },

  disconnectMeeting: function () {
    var inEvent = vidyoClientMessages.inEventLeave();
    return (this.get('client').sendEvent(inEvent));
  },

  /**
   * Start sharing
   * @param  {String} shareId Share window or desktop id. Undefined to stop share.
   * @return {Object} Application object
   */
  clientLocalShareStart: function (shareId) {
    var inEvent, msg;
    if (shareId === undefined) {
      inEvent = vidyoClientMessages.inEventUnshare();
    } else {
      inEvent = vidyoClientMessages.inEventShare({
        window: shareId
      });
    }
    if (this.get('client').sendEvent(inEvent)) {
      msg = "VidyoWeb sent " + inEvent.type + " event successfully";
    } else {
      msg = "VidyoWeb did not send " + inEvent.type + " event successfully!";
    }
    console.debug(msg);
  },

  /**
   * Stop sharing
   * @return {Object} Application object
   */
  clientLocalShareStop: function () {
    var inEvent, msg;
    inEvent = vidyoClientMessages.inEventUnshare();

    if (this.get('client').sendEvent(inEvent)) {
      msg = "VidyoWeb sent " + inEvent.type + " event successfully";
    } else {
      msg = "VidyoWeb did not send " + inEvent.type + " event successfully!";
    }
    console.debug(msg);
  },

  /**
   * Send a group chat message
   * @param  {String} message Message to send.
   * @return {Object} Application object
   */
  clientGroupChatSend: function (message) {
    var params = {}, inEvent, msg;

    params.message = message;
    inEvent = vidyoClientMessages.inEventGroupChat(params);

    if (this.get('client').sendEvent(inEvent)) {
      msg = "VidyoWeb sent " + inEvent.type + " event successfully";
    } else {
      msg = "VidyoWeb did not send " + inEvent.type + " event successfully!";
    }
    console.debug(msg);

    return this;
  },

  /**
   * Send a private chat message
   * @param {Object} params Reference to parameter object.
   * @return {Object} VidyoRequestApi object
   */
  clientPrivateChatSend: function (params) {
    var inEvent, msg;
    inEvent = vidyoClientMessages.inEventPrivateChat(params);

    if (this.get('client').sendEvent(inEvent)) {
      msg = "VidyoWeb sent " + inEvent.type + " event successfully";
    } else {
      msg = "VidyoWeb did not send " + inEvent.type + " event successfully!";
    }
    console.debug(msg);

    return this;
  },

  /**
   * Retrieves session information like room display name
   * @return {Object} Session information
   */
  clientSessionGetInfo: function () {
    var request = vidyoClientMessages.requestGetCurrentSessionDisplayInfo({});
    var msg;
    if (this.get('client').sendRequest(request)) {
      msg = "VidyoWeb sent " + request.type + " request successfully";
    } else {
      msg = "VidyoWeb did not send " + request.type + " request successfully!";
    }
    console.debug(msg);

    return request;
  },


  clientSharesSetCurrent: function (currApp) {
    var request = this.clientSharesGet();
    var numberOfShares;
    request.newApp = currApp + 1;
    request.type = "RequestSetWindowShares";
    request.requestType = "ChangeSharingWindow";

    var msg;

    if (this.get('client') && this.get('client').sendRequest(request)) {
      msg = "VidyoWeb sent " + request.type + " request successfully";
    } else {
      msg = "VidyoWeb did not send " + request.type + " request successfully!";
    }
    console.debug(msg);

    numberOfShares = request.newApp;
    return numberOfShares;
  },

  /**
   * Gets desktops and windows available in the system
   * @return {Object} Desktops and windows object
   */
  clientLocalSharesGet: function () {
    var request = vidyoClientMessages.requestGetWindowsAndDesktops({});
    var msg;
    if (this.get('client') && this.get('client').sendRequest(request)) {
      msg = "VidyoWeb sent " + request.type + " request successfully";
    } else {
      msg = "VidyoWeb did not send " + request.type + " request successfully!";
    }
    console.debug(msg);

    return request;
  },

  /**
   * Select remote share to see
   * @return {Object} Currently available shares
   */
  clientSharesGet: function () {
    var request = vidyoClientMessages
      .requestGetWindowShares({});
    var msg;
    if (this.get('client') && this.get('client').sendRequest(request)) {
      msg = "VidyoWeb sent " + request.type + " request successfully";
    } else {
      msg = "VidyoWeb did not send " + request.type + " request successfully!";
    }
    console.debug(msg);


    return request;
  },

  /**
   * Retrieves Vidyo runtime configuration
   * @return {Object} Runtime configuration
   */
  clientConfigurationGet: function () {
    var request = vidyoClientMessages.requestGetConfiguration({});

    var msg;
    if (this.get('client') && this.get('client').sendRequest(request)) {
      msg = "VidyoWeb sent " + request.type + " request successfully";
    } else {
      msg = "VidyoWeb did not send " + request.type + " request successfully!";
    }
    console.debug(msg);

    return request;
  },

  /**
   * Get information about participants in a meeting.
   * @return {Object} Object with participants' array
   */
  clientParticipantsGet: function () {
    var me = this.clientCurrentUserGet();
    var participants = [];
    var i;

    var request = vidyoClientMessages.requestGetParticipants();
    this.get('client').sendRequest(request);

    for (i = 0; i < request.numberParticipants; i++) {
      let participant = {};
      if (me && me.currentUserDisplay && (me.currentUserDisplay === request.name[i])) {
        participant.isMe = true;
      }
      participant.name = request.name[i];
      participant.uri = request.URI[i];
      participant.index = i;
      participants.push(participant);

    }

    return participants;
  },

  /**
   * Sets Vidyo runtime configuration
   * @return {Object} Applied configuration
   */
  clientConfigurationSet: function (vidyoConfig) {
    var request = vidyoClientMessages
      .requestSetConfiguration(vidyoConfig);
    var msg;
    if (this.get('client') && this.get('client').sendRequest(request)) {
      msg = "VidyoWeb sent " + request.type + " request successfully";
    } else {
      msg = "VidyoWeb did not send " + request.type + " request successfully!";
    }
    console.debug(msg);

    return request;
  },

  /**
   * Get current user information
   * @return {Object} Current user information object
   */
  clientCurrentUserGet: function () {
    var self = this;
    var request;

    request = vidyoClientMessages.requestGetCurrentUser({});
    var msg;
    if (self.get('client') && self.get('client').sendRequest(request)) {
      msg = "VidyoWeb sent " + request.type + " request successfully";
    } else {
      msg = "VidyoWeb did not send " + request.type + " request successfully!";
    }

    console.debug(msg);

    return request;
  },

  clientRequestGetVolumeAudioIn: function(){
    var self = this;
    var request;

    request = vidyoClientMessages.requestGetVolumeAudioIn({});
    var msg;
    if (self.get('client') && self.get('client').sendRequest(request)) {
      msg = "VidyoWeb sent " + request.type + " request successfully";
    } else {
      msg = "VidyoWeb did not send " + request.type + " request successfully!";
    }

    console.debug(msg);

    return request;
  },

  clientRequestGetVolumeAudioOut: function(volume){
    var self = this;
    var request;

    request = vidyoClientMessages.requestGetVolumeAudioOut({});
    var msg;
    if (self.get('client') && self.get('client').sendRequest({"volume": volume})) {
      msg = "VidyoWeb sent " + request.type + " request successfully";
    } else {
      msg = "VidyoWeb did not send " + request.type + " request successfully!";
    }

    console.debug(msg);

    return request;
  },
  clientRequestSetVolumeAudioOut: function(volume){
    var self = this;
    var request;

    request = vidyoClientMessages.requestSetVolumeAudioOut({"volume": volume});
    var msg;
    if (self.get('client') && self.get('client').sendRequest(request)) {
      msg = "VidyoWeb sent " + request.type + " request successfully";
    } else {
      msg = "VidyoWeb did not send " + request.type + " request successfully!";
    }

    console.debug(msg);

    return request;
  }
})
;
