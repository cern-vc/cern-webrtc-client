import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * Initializes the login form with validation
   */
  didInsertElement(){

    Ember.$('a.item').click(function () {
      Ember.$('.item').removeClass("active");
      Ember.$(this).addClass("active");
    });
  },
  actions: {
    goToLink: function (anchor) {
      console.debug("#system-requirements");
      console.debug(Ember.$("#system-requirements").offset());
      Ember.$('body').scrollTop(Ember.$(anchor).offset().top);
    }
  }
});
