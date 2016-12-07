import Ember from 'ember';
import config from '../config/environment';

/**
 * Route that will be tracked on ember-metrics.
 */
export default Ember.Route.extend({
  location: config.locationType,
  metrics: Ember.inject.service(),
  currentRouteName: 'not_defined',
  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = this.getWithDefault('currentRouteName', 'unknown');

      Ember.get(this, 'metrics').trackPage({page, title});
    });
  },
  actions: {
    /**
     * Every time that there is a transition to this route, the page will be tracked by ember-metrics.
     */
    didTransition() {
      this._super(...arguments);
      this._trackPage();
      var self = this;
      DetectRTC.load(function () {
        if (DetectRTC.isMobileDevice && self.currentRouteName !== 'downloads') {
          self.transitionTo('downloads');
        }
      });
    },
    willTransition(){
      var self = this;
      console.debug("Will transition...");
      DetectRTC.load(function () {
        if (DetectRTC.isMobileDevice) {
          self.transitionTo('downloads');
        }
      });
    }
  }
});
