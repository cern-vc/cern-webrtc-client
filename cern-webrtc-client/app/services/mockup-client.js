import Ember from 'ember';

export default Ember.Service.extend({

  /** @private */
  that: {},

  // private instance variables for created object,
  // initial values of which are potentially passed
  // into this factory function
  /** @private */
  webrtcPlugin: null,

  // /** @private */
  // outEventCallbackObject : null,

  /** @private */
  defaultOutEventCallbackMethod: "",

  /** @private */
  logCallback: null,

  /** @private */
  sessionManager: null,

  // other private instance variables for created object
  /** @private */
  voutEventCallbackMethods: {},

  // private helper functions
  /** @private */
  setConfig: function (config) {
    if (config && config.outEventCallbackObject !== undefined) {
      this.set('outEventCallbackObject', config.outEventCallbackObject);
    }
    if (config && config.defaultOutEventCallbackMethod !== undefined) {
      this.set('defaultOutEventCallbackMethod', config.defaultOutEventCallbackMethod);
    }
    if (config && config.logCallback !== undefined) {
      this.set('logCallback', config.logCallback);
    }
    if (config && config.sessionManager !== undefined) {
      this.set('sessionManager', config.sessionManager);
    }
  },

  /** @private */
  log: function (message) {
    if (this.get('logCallback')) {
      this.get('logCallback')(message);
    }
  },

  start: function (config) {
    this.get('logger').debug("Vidyo Test Client sendRequest");
    var retVal = true;
    this.setConfig(config);
    if (!this.get('sessionManager')) {
      this.get('logger').debug("start() invoked without sessionManager!");
      return false;
    }

    return retVal;
  },
  stop: function () {
    var retVal = false;

    return retVal;
  },
  setOutEventCallbackObject: function (outEventCallbackObjectArg) {
    var self = this;
    Ember.run(function () {
      this.get('logger').debug("VidyoClient: setOuEventCallbackObject");
      this.get('logger').debug(outEventCallbackObjectArg);
      self.set('outEventCallbackObject', outEventCallbackObjectArg);
      this.get('logger').debug(self.get('outEventCallbackObject'));
    });
  },

  /**
   * Sets the callback method that will be used by the invoked
   * VidyoClient wrapper object, for any out event type by default.
   * If method is specified using a string value type, it will be
   * invoked with variable 'this' set to the value set as the callback
   * object.
   * If method is specified using a function value type, it will be
   * invoked with variable 'this' set to the wrapper object.
   *
   * @param {Object} defaultOutEventCallbackMethodArg Default out event
   *                                                  callback method name
   *                                                  (when String) or
   *                                                  function object.
   * @return {Object} Reference to invoked VidyoClient wrapper object.
   */
  setDefaultOutEventCallbackMethod: function (defaultOutEventCallbackMethodArg) {
    this.set('defaultOutEventCallbackMethod', defaultOutEventCallbackMethodArg);
  },

  /**
   * Sets the callback function that will be used by the invoked
   * VidyoClient wrapper object, for logging.
   *
   * @param {Function} logCallbackArg Reference to logging callback
   *                                  function object.
   * @return {Object} Reference to invoked VidyoClient wrapper object.
   */
  setLogCallback: function (logCallbackArg) {
    this.set('logCallback', logCallbackArg);
  },

  /**
   * Sets the sessionManager address that will be used by the invoked
   * VidyoClient wrapper object, for making call to
   *
   * @param {String} sessionManagerArg address of session manager
   * @return {Object} Reference to invoked VidyoClient wrapper object.
   */
  setSessionManager: function (sessionManagerArg) {
    this.set('sessionManager', sessionManagerArg);
  },

  /**
   * Sets the callback method that will be used by the invoked
   * VidyoClient wrapper object, for the specified out event type.
   * If method is specified using a string value type, it will be
   * invoked with variable 'this' set to the value set as the callback
   * object.
   * If method is specified using a function value type, it will be
   * invoked with variable 'this' set to the wrapper object.
   *
   * @param {String} outEventType String value for specific type of
   *                              out event.
   * @param {Object} callbackMethod Callback method name (when String)
   *                                or function object.
   * @return {Object} Reference to invoked VidyoClient wrapper object.
   */
  setOutEventCallbackMethod: function (outEventType, callbackMethod) {

    var callbackMethods = this.get('outEventCallbackMethods');
    callbackMethods[outEventType] = callbackMethod;
    this.set('outEventCallbackMethods', callbackMethods);
  },

  sendEvent(event){
    var self = this;
    this.get('logger').debug("Vidyo Client: sendEvent");
    this.get('logger').debug(event);
    Ember.run.later(function () {
      if (event.type === "PrivateInEventVcsoapGuestLink") {
        self.dispatchOutEvent({'type': 'OutEventConferenceActive'});
      }

      if (event.type === "InEventLeave") {
        self.dispatchOutEvent({'type': 'OutEventConferenceEnded'});
      }

      if (event.type === "InEventMuteAudioIn") {
        self.get('logger').debug("InEventMuteAudioIn HERE");
        self.get('logger').debug(event);
        self.dispatchOutEvent({'type': 'OutEventMutedAudioIn', 'isMuted': event.willMute});
      }

      if (event.type === "InEventMuteVideo") {
        self.get('logger').debug("InEventMuteVideo HERE");
        self.get('logger').debug(event);
        self.dispatchOutEvent({'type': 'OutEventMutedVideo', 'isMuted': event.willMute});
      }

      if (event.type === "InEventMuteAudioOut") {
        self.get('logger').debug("InEventMuteAudioIn HERE");
        self.get('logger').debug(event);
        self.dispatchOutEvent({'type': 'OutEventMutedAudioOut', 'isMuted': event.willMute});
      }

    }, 100);

    return true;
  },
  sendRequest(request){
    this.get('logger').debug("request");
    this.get('logger').debug(request);

    switch (request) {
      case("RequestGetCurrentSessionDisplayInfo"):
        return {sessionDisplayText: "Test meeting"};
    }

    return true;
  },

  test(){
    this.get('logger').debug("Mockup client loaded");
  },
  dispatchOutEvent: function (event) {
    this.get('logger').debug("VidyoClient dispatching: " + event);

    if (event.type === 'OutEventConferenceActive') {
      this.get('logger').debug("OutEventConferenceActive");
      this.get('plugin-manager').meetingActiveCallback(event);
    }

    if (event.type === 'OutEventConferenceEnded') {
      this.get('plugin-manager').meetingEndedCallback(event);
    }

    if (event.type === 'OutEventMutedAudioIn') {
      this.get('plugin-manager').muteAudioInCallback(event);
    }

    if (event.type === 'OutEventMutedVideo') {
      this.get('plugin-manager').muteVideoCallback(event);
    }

    if (event.type === 'OutEventMutedAudioOut') {
      this.get('plugin-manager').muteAudioOutCallback(event);
    }
  },
  isLoaded(){
    return true;
  },
  isStarted(){
    return true;
  }
});
