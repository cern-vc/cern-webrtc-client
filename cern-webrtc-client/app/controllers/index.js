import Ember from 'ember';

/**
 * This controller is needed to get que query params from the URL.
 * Also display error messages while connecting.
 */
export default Ember.Controller.extend({
  actions: {
    verifyConfiguration(){
      this.get('configuration-manager').verifyConfiguration();
    }
  }

});
