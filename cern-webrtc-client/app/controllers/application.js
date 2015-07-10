import Ember from 'ember';

export default Ember.Controller.extend({
  browserSupported: null,
  webRTCSupported: null,
  serverReachable: null,
  microphoneAvailable: null,
  errorsWhileLoading: Ember.computed("browserSupported", "webRTCSupported", "serverReachable", "microphoneAvailable", function () {
    return !!(!this.get("browserSupported") || !this.get("webRTCSupported") || !this.get("serverReachable") || !this.get("microphoneAvailable"));
  })
});
