import Ember from 'ember';

export default Ember.Component.extend({
  numberOfStreams: Ember.computed.alias('meeting-manager.streamCount'),
});
