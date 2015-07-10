import TrackedRoute from './tracked-route';

export default TrackedRoute.extend({
  /**
   * Used on ember-metrics to provide the page name
   */
  currentRouteName: 'meeting',
  actions: {
    redirectToIndex(){
      this.get('logger').debug("Route Meeting: redirectToIndex");
      this.transitionTo('index');
    }
  },
  model: function (params) {
    return {id: params.id};
  },
  /**
   * Sets up the meeting key
   * @param controller The controller of the route
   * @param model The model of the route
     */
  setupController: function (controller, model) {
    this.get('meeting-manager').setCurrentMeetingKey(model.id);
    this._super(controller, model);
    if (!this.get('connection-manager').get('isJoining') && !this.get('connection-manager').get('isConnected')) {
      this.transitionTo('index', {queryParams: {key: model.id}});
    }
  }
});
