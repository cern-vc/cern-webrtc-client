import Ember from 'ember';

export default Ember.Service.extend({
  isSharing: false,
  isLocalSharing: false,
  currentShareId: 0,
  transformedShares: [],
  numberOfShares: 0,

  shareUpdateEvent: function (event, shares) {
    var self = this;
    Ember.run(function () {
      console.debug('shareUpdateEvent::done' + event);
      self.set('transformedShares', []);
      var i;
      for (i = 0; i < shares.numApp; i++) {
        self.get('transformedShares')
          .push({
            name: shares.remoteAppName[i],
            id: i,
            highlight: ((shares.numApp - 1) === i)
          });
      }
    });

  },
  setCurrentShareId(newId) {
    this.set('currentShareId', newId);
  },
  setIsSharing(value){
    this.set('isSharing', value);
  },
  setNumberOfShares(value){
    this.set('numberOfShares', value);
  },
  setIsLocalSharing(value){
    this.set('isLocalSharing', value);
  },
  setDefaultValues(){
    this.set('currentShareId', 0);
    this.set('isSharing', false);
    this.set('isLocalSharing', false);
    this.set('transformedShares', []);
    this.set('numberOfShares', 0);
  }
});
