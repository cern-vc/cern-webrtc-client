import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  actions: {
    /**
     * Prevents the default link behavior
     */
    doNothing(){

    },

    /**
     * Clears the session data after logout.
     */
    invalidateSession() {
      if (config.environment !== 'development' && config.environment !== 'testing') {
        this.get('session').invalidate();
      } else {
        this.get('session').set('data.dummyAuthenticated', false);
      }
    }
  }
});
