import Ember from 'ember';

export default Ember.Route.extend({
  /**
   * If the user browser is webrtc capable, then load the vidyo plugin.
   */
  session: Ember.inject.service('session'),
  queryParamManager: Ember.inject.service('query-param-manager')
})
;
