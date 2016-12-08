import Ember from 'ember';

export default Ember.Component.extend({
  logEnabled: Ember.computed.alias('logger.logEnabled'),

  microphoneAvailable: Ember.computed.alias('configuration-manager.microphoneAvailable'),
  serverReachable: Ember.computed.alias('configuration-manager.serverReachable'),
  webRTCSupported: Ember.computed.alias('configuration-manager.webRTCSupported'),
  browserSupported: Ember.computed.alias('configuration-manager.browserSupported'),
  alreadyLoaded: Ember.computed.alias('configuration-manager.alreadyLoaded'),

  whenServerAvailable: Ember.observer('serverReachable', function () {
    let self = this;
    console.debug("want to redirect to join meeting screen...");
    Ember.run.later((function () {
      self.sendAction('redirectToJoinMeeting');
    }), 3000);
  }),

  actions: {
    /**
     * Displays the feedback modal to send feedback
     */
    displayFeedbackModal(){
      console.debug("Display feedback modal");
      Ember.$('.modal-feedback').modal("show");
    },
  }
});
