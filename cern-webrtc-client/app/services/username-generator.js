import Ember from 'ember';

export default Ember.Service.extend({

  generateRandomUsername: function () {
    let chance = new Chance();
    return chance.name();
  }
});
