import Ember from 'ember';

export default Ember.Component.extend({
  isMutedMic: Ember.computed.alias('meeting-manager.isMutedMic'),
  isMutedVideo: Ember.computed.alias('meeting-manager.isMutedVideo'),
  cameras: Ember.computed.alias('configuration-manager.cameras'),
  isSelfViewVisible: Ember.computed('cameras', function () {
    return this.get('cameras').length > 0;
  }),
});
