import Ember from 'ember';

export default Ember.Service.extend({
  isConnected: false,
  isGuest: true,
  isJoining: false,
  disconnectedFromServer: false,
  expectDisconnect: false,
  connectionStep: '',
  connectionFault: '',
  connectionFaultMessage: '',
  serverAvailable: true,

  setServerAvailable(value){
    var self = this;
    self.set('serverAvailable', value);

  },

  setIsConnected(value){
    var self = this;

    self.set('isConnected', value);

  },
  setCurrentUserAsGuest(value){
    var self = this;
    self.set('isGuest', value);

  },
  setIsJoining(value){
    var self = this;
    self.set('isJoining', value);

  },
  /**
   * This status should be changed when the disconnection is triggered from the server.
   * For example, when the room owner kicks a user from the Vidyo Desktop client.
   */
  setDisconnectedFromServer(value){
    var self = this;
    self.set('disconnectedFromServer', value);

  },

  /**
   * Sets all the different error messages
   * @param event
     */
  setConnectionFault(event) {

    this.set('connectionFault', event.fault);

    switch (event.fault) {

      case "ErrorMeetingLocked":
        this.set('connectionFaultMessage', 'This meeting room is locked');
        break;
      case "ErrorWrongPin":
        this.set('connectionFaultMessage', 'The PIN was wrong. Please try again.');
        break;
      case "ErrorServerNotAvailable":
        this.set('connectionFaultMessage', 'ErrorServerNotAvailable');
        break;
      // case "ErrorServerUnreachable":
      //   this.set('connectionFaultMessage', 'The server is unreachable. Please wait a few seconds and try again. If the error persists you can use the Vidyo native client instead.');
      //   break;
      // case "ErrorNoMicDetected":
      //   this.set('connectionFaultMessage', 'There is no microphone dectected on your system. Currently we do not support connection without an active microphone');
      //   break;
      case "ErrorUnableToSendGuestLinkEvent":
        this.set('connectionFaultMessage', 'TODO');
        break;
      case "ErrorIncorrectRoomKey":
        this.set('connectionFaultMessage', 'Unable to connect to the selected room. This error usually happens when the room key is incorrect.');
        break;
    }
  },

  resetConnectionFault(){
    this.set('connectionFault', '');
    this.set('connectionFaultMessage', '');
  },

  meetingEnded(event) {
    this.set('isConnected', false);
    this.set('disconnectedFromServer', true);
    if (!this.get('expectDisconnect')) {
      this.set('connectionFault', event);
      this.set('connectionFaultMessage', 'You were disconnected from meeting by remote server');
    }
  },

  setExpectDisconnect(value) {
    this.set('expectDisconnect', value);
  },

  setAllParametersToDefault() {
    this.set('expectDisconnect', false);
    this.set('isConnected', false);
    this.set('isGuest', true);
    this.set('isJoining', false);
    this.set('disconnectedFromServer', false);
  }
});
