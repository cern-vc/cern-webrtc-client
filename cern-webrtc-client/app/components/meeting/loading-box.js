import Ember from 'ember';

export default Ember.Component.extend({
  isConnected: Ember.computed.alias('connection-manager.isConnected'),
  connectionFault: Ember.computed.alias('connection-manager.connectionFault'),
  logEnabled: Ember.computed.alias('logger.logEnabled'),

  /**
   * Checks if the connection fails and redirects to the index.
   */
  monitorConnectionFault: function () {
    if (this.get('connectionFault') !== '') {
      console.debug('monitorConnectionFault: connectionFaultMessage');
      console.debug(this.get('connectionFaultMessage'));
      this.sendAction('redirectToJoinMeeting', this.get('connectionFaultMessage'));
    }
  }.observes('connectionFault'),

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
