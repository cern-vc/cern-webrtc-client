import Ember from 'ember';

/**
 * This controller is needed to get que query params from the URL.
 * Also display error messages while connecting.
 */
export default Ember.Controller.extend({
  queryParams: ['key', 'pin'],
  key: '',
  pin: '',
  actions: {
    verifyConfiguration(){
      this.get('configuration-manager').verifyConfiguration();
    },

    redirectToJoinMeeting(){
      console.debug("Redirecting to join meeting screen...");
      this.transitionToRoute('join-meeting', {queryParams: {key: this.get('key'), pin: this.get('pin')}});
    }
  }

});
