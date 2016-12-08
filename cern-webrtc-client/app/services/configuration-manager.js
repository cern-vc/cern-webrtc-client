import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({

  cameras: [],
  microphones: [],

  microphoneAvailable: null,
  serverReachable: null,
  webRTCSupported: null,
  browserSupported: null,
  alreadyLoaded: false,

  maxNumberOfTries: 3,
  numberOfTries: 0,
  timeBetweenTries: 1000, //milliseconds

  queryParamManager: Ember.inject.service('query-param-manager'),

  configurationUpdateEventDone: function (event, newConfig) {

    var self = this;
    Ember.run(function () {
      Ember.$.each(newConfig.cameras, function (i, name) {
        self.get('cameras')
          .addObject({
            name: name,
            id: i,
            isSelected: (i === newConfig.currentCamera)
          });
      });

      Ember.$.each(newConfig.microphones, function (i, name) {
        self.get('microphones')
          .addObject({
            name: name,
            id: i,
            isSelected: (i === newConfig.currentMicrophone)
          });
      });
    });
  },


  /**
   * Checks if the browser supports webrtc.
   * @returns {isWebRTCSupported|boolean}
   */
  isWebRTCSupported: function () {
    // If we are testing we want to allow the plugin load even if webrtc is not enabled on PhantomJS
    return (DetectRTC.isWebRTCSupported || (config.environment !== 'testing'));
  },

  /**
   * Checks if there is a microphone available and permissions are granted.
   * @returns {*}
   */
  hasMicrophoneAvailable(){
    if (DetectRTC.hasMicrophone && DetectRTC.isWebsiteHasMicrophonePermissions) {
      this.set("microphoneAvailable", true);
      console.log("Microphone Available: OK");
    } else {
      this.set("microphoneAvailable", false);
      console.log("Microphone Available: NO");
    }
    return (DetectRTC.hasMicrophone && DetectRTC.isWebsiteHasMicrophonePermissions);
  },

  /**
   * Checks if the session manager is reachable.
   */
  isServerReachable(){
    var self = this;
    var scheme = "https://";
    if (this.get("numberOfTries") < this.get("maxNumberOfTries")) {
      this.verifyServerIsReachable(scheme, config.session_manager, "/zincadmin/service/getinstance.htm").then(function (data) {

        if (data.errorMessage === 'NotAvailable') {
          console.log("Server Reachable: NO");
          self.set("serverReachable", false);
        } else {
          console.log("Server Reachable: OK");
          self.set("serverReachable", true);
          self.set("alreadyLoaded", true);
        }
      }).catch(function (error) {
        Ember.run.later(function () {
          self.set("numberOfTries", self.get("numberOfTries") + 1);
          self.isServerReachable();
        }, self.get('timeBetweenTries'));
      });
    } else {
      self.set("serverReachable", false);
    }
  },

  /**
   * Checks if the users browser is supoported by making a request to the backend.
   * @param self Reference to the current class
   * @returns {*} An Ajax promise
   */
  isBrowserSupported: function (self) {
    let browserData = JSON.stringify({
      "browser_name": DetectRTC.browser.name,
      "browser_version": DetectRTC.browser.version
    });
    console.debug(browserData);

    return Ember.$.ajax({
      url: config.backend_server_url + "/api/v1.0/browser/",
      type: "POST",
      data: browserData,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      error: function (error) {
        console.log("Browser Supported: NO");
        console.debug(error);
      },
      timeout: 5000
    });
  },

  verifyServerIsReachable(scheme, url, path){
    var self = this;
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        url: scheme + url + path,
        dataType: "json",
        timeout: 1000,
        success: function (response) {
          console.debug("response");
          console.debug(response);
          resolve(response);
        },
        error: function (reason) {
          reject(reason);
        }
      });
    });
  },

  verifyConfiguration(){

    var self = this;

    if (!self.get("alreadyLoaded")) {

      if (self.isWebRTCSupported()) {
        console.log("WebRTC Supported: OK");
        self.set("webRTCSupported", true);
        var constraints = {
          audio: true
        };

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
          console.debug(stream);
          DetectRTC.load(function () {
            if (self.hasMicrophoneAvailable()) {
              self.isBrowserSupported(self).then(function (data) {
                if (data["should_redirect"] === false) {
                  console.log("Browser Supported: OK");
                  self.set("browserSupported", true);
                  self.isServerReachable();
                } else {
                  console.log("Browser Supported: NO");
                  self.set("browserSupported", false);
                }
              });
            }

            Ember.$(stream.getTracks()).each(function( index, track ) {
              track.stop();
            });

          });

        }).catch(function (e) {
          console.error(e);
          console.log("Microphone Available: NO");
          self.set("microphoneAvailable", false);
        });


      } else {
        self.set("webRTCSupported", false);
        console.log("WebRTC Supported: NO");
      }
    }
  }

});

