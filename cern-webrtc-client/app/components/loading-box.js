import Ember from 'ember';

export default Ember.Component.extend({
  isConnected: Ember.computed.alias('connection-manager.isConnected'),
  connectionFault: Ember.computed.alias('connection-manager.connectionFault'),

  /**
   * Checks if the connection fails and redirects to the index.
   */
  monitorConnectionFault: function () {
    if (this.get('connectionFault') !== '') {
      this.get('logger').debug('monitorConnectionFault: connectionFaultMessage');
      this.get('logger').debug(this.get('connectionFaultMessage'));
      this.sendAction('redirectToIndex', this.get('connectionFaultMessage'));
    }
  }.observes('connectionFault')
});
