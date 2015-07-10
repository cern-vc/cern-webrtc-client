import Ember from 'ember';
import TrackedComponent from './tracked-component';

export default TrackedComponent.extend({
  /**
   * Configuration manager attrs
   */
  cameras: Ember.computed.alias('configuration-manager.cameras'),
  speakers: Ember.computed.alias('configuration-manager.speakers'),
  microphones: Ember.computed.alias('configuration-manager.microphones'),

  availableVideoSources: [],
  availableAudioSources: [],
  audioContent: null,
  stream: null,

  notificationsStatus: Notification.permission,

  /**
   * When destroying the element, we must remove also the modals so they won't appear twice
   */
  willDestroyElement() {
    this._super(...arguments);
    this.get('logger').debug("Will destroy configuration box");
    Ember.$('.modal-configuration').remove();
  },

  /**
   * We initialize the configuration modal and the actions when it is closed.
   */
  didInsertElement: function () {
    var self = this;
    Ember.$('.modal-configuration').modal({
      // detachable: false,
      observeChanges: true,
      onShow: function () {
        self.get('logger').debug("onShow");
        self.set('modalConfigurationIsOpen', true);
        self.get('logger').debug("Configuration Modal Opened");
        self.initAudioVideoDevices();
        Ember.$('select.dropdown').dropdown();
      },
      onApprove: function () {
        self.saveConfig();
        return true;
      },
      onDeny: function () {
        self.closeConfigurationModal();
        return true;
      }
    });
  },

  /**
   * Once the devices are retrieved, we have to store their info.
   * @param deviceInfos Devices retrieved
   * @param self Reference to the current class
   */
  gotDevices(deviceInfos, self) {

    for (var i = 0; i !== deviceInfos.length; ++i) {
      var deviceInfo = deviceInfos[i];
      this.get('logger').debug(deviceInfo);

      if (deviceInfo.kind === 'audioinput') {
        self.get("availableAudioSources").push(deviceInfo);
      } else if (deviceInfo.kind === 'videoinput') {
        self.get("availableVideoSources").push(deviceInfo);
      } else {
        this.get('logger').debug('Some other kind of source/device: ', deviceInfo);
      }
    }

  },
  /**
   * Called when the getUserMedia fails
   * @param error Error message
   */
  errorCallback(error) {
    this.get('logger').debug('navigator.getUserMedia error: ', error);
  },

  /**
   * Sets the current device to the values of the camera and microphone values.
   * @param self Reference to the current class
   */
  setActiveDevice(self){
    this.get('logger').debug("Set active device");
    var selectedCamera = Ember.$("#configurationCamera").val();
    var selectedMic = Ember.$("#configurationMic").val();

    this.get('logger').debug("Current camera: " + selectedCamera);
    this.get('logger').debug("Current mic: " + selectedMic);

    var selectedCameraId = this.get("availableVideoSources")[selectedCamera].deviceId;
    var selectedMicId = this.get("availableAudioSources")[selectedMic].deviceId;

    this.get('logger').debug("Current camera ID: " + selectedCameraId);
    this.get('logger').debug("Current mic ID: " + selectedMicId);

    var constraints = {
      video: {optional: [{sourceId: selectedCameraId}]},
      audio: {optional: [{sourceId: selectedMicId}]}
    };

    this.get('logger').debug(constraints);

    if (self.get('stream')) {
      self.get('stream').getTracks().forEach(function (track) {
        track.stop();
      });
    }

    // Adapted from: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    var mediaDevices = (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) ?
      navigator.mediaDevices : ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
      getUserMedia: function (c) {
        return new Ember.RSVP.Promise(function (y, n) {
          (navigator.mozGetUserMedia ||
          navigator.webkitGetUserMedia).call(navigator, c, y, n);
        });
      }
    } : null);

    mediaDevices.getUserMedia(constraints).then(function (stream) {

      self.set('stream', stream);
      self.get('logger').debug(stream);
      var video = document.querySelector("#player");
      video.src = "";
      video.src = window.URL.createObjectURL(stream);
      video.play();
      return navigator.mediaDevices.enumerateDevices();
    }).catch(function (e) {
      self.get('logger').debug(e);
    });


  },

  /**
   * Callback method that is called when the modal is openend.
   */
  openConfigurationModal(){
    this.set('modalConfigurationIsOpen', true);
    this.get('logger').debug("Configuration Modal Opened");
    this.initAudioVideoDevices();
  },

  /**
   * Gets the devices of the system and set the first value as active.
   */
  initAudioVideoDevices(){
    var self = this;
    navigator.mediaDevices.enumerateDevices()
      .then(function (deviceInfos) {
        self.gotDevices(deviceInfos, self);
      }).then(function () {
      self.setActiveDevice(self);
    })
      .catch(self.errorCallback);
  },

  /**
   * Callback that takes place when the configuration modal is closed.
   */
  closeConfigurationModal(){
    this.get('logger').debug("Close configuration modal");
    this.set('modalConfigurationIsOpen', false);

    var video = document.querySelector("#player");
    video.src = "";

    if (this.get('stream')) {
      this.get('logger').debug("Stop stream tracks...");
      this.get('stream').getTracks().forEach(function (track) {
        track.stop();
      });
    }
    this.set('stream', null);

  },
  /**
   * Callback that is called when the save button is clicked.
   */
  saveConfig(){
    var selectedCamera = Ember.$("#configurationCamera").val();
    var selectedMic = Ember.$("#configurationMic").val();
    var conf = this.get('vidyo-requests-api').clientConfigurationGet();

    conf.currentCamera = parseInt(selectedCamera);
    conf.currentMicrophone = parseInt(selectedMic);

    this.get('vidyo-requests-api').clientConfigurationSet(conf);

    this.closeConfigurationModal();
  },

  actions: {
    /**
     * Onchange action for the video input
     */
    changeVideoInput(){
      this.get('logger').debug("changeVideoInput");
      this.setActiveDevice(this);

    },
    /**
     * Onchange action for the audio input
     */
    changeAudioInput(){
      this.get('logger').debug("changeAudioInput");
      this.setActiveDevice(this);
    },

    /**
     * Notifications button actions
     */
    changeNotificationsSettings(){
      var self = this;
      this.get('logger').debug("Change notifications settings");
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        this.get('notification-manager').sendDesktopNotification("Desktop Notifications are working!", "CERN WebRTC Client");
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            self.get('notification-manager').sendDesktopNotification("Desktop Notifications enabled.", "CERN WebRTC Client");
          }
        });
      }
    }
  }

});
