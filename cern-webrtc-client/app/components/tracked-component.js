import Ember from 'ember';

/**
 * Class used to implement analytics event tracking.
 */
export default Ember.Component.extend({
  metrics: Ember.inject.service(),
  _trackEvent(zone, element) {
    var self = this;
    var zoneParam = zone;
    var elementParam = element;
    Ember.run.scheduleOnce('afterRender', this, () => {
      const zone = zoneParam || 'undefined_zone';
      const element = elementParam || 'undefined_element';
      self.get('logger').debug(zone, element);
      Ember.get(this, 'metrics').trackEvent({zone, element});
    });
  },
  actions: {
    doNothing(){

    }
  }
});
