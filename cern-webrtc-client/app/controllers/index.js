import Ember from 'ember';

/**
 * This controller is needed to get que query params from the URL.
 * Also display error messages while connecting.
 */
export default Ember.Controller.extend({
  queryParams: ['key', 'pin'],
  key: '',
  pin: '',
  modalFaultIsOpen: false,
  connectionFault: Ember.computed.alias('connection-manager.connectionFault'),
  connectionFaultMessage: Ember.computed.alias('connection-manager.connectionFaultMessage'),
  serverAvailable: Ember.computed.alias('connection-manager.serverAvailable'),

  microphoneAvailable: Ember.computed.alias('configuration-manager.microphoneAvailable'),
  serverReachable: Ember.computed.alias('configuration-manager.serverReachable'),
  webRTCSupported: Ember.computed.alias('configuration-manager.webRTCSupported'),
  browserSupported: Ember.computed.alias('configuration-manager.browserSupported'),
  alreadyLoaded: Ember.computed.alias('configuration-manager.alreadyLoaded'),

  /**
   * Opens the fault modal
   */
  openFaultModal() {
    this.set('modalFaultIsOpen', true);
    Ember.$("#modal-fault").modal("show");
  },
  /**
   * Observes a connection fault and displays a modal if so
   */
  connectionFaultDetect: function () {
    var self = this;
    if (this.get('connectionFault') !== '') {
      if (this.get('connectionFaultMessage') !== 'ErrorServerNotAvailable') {
        Ember.run.later((function () {
          self.openFaultModal();
        }), 50);
        console.debug("Open fault modal index");
      }

    }
  }.observes('connectionFault'),
  actions: {
    /**
     * Closes the fault modal
     */
    closeFaultModal(){
      this.set('modalFaultIsOpen', false);
      this.get('connection-manager').resetConnectionFault();
    },

    verifyConfiguration(){
      this.get('configuration-manager').verifyConfiguration();
    }
  }
});
