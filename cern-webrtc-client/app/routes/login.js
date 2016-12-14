import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service('session'),
  torii: Ember.inject.service('torii'),
  modalLoginIsOpen: false,
  signingIn: false,
  loginIsLoading: false,

  beforeModel(transition) {
    if(this.get('session').get('isAuthenticated')){
      transition.abort();
      this.transitionTo('join-meeting');
    }
  },

  /**
   * Authenticates the user using cern-oauth2 and token (against the backend with the retrieved code from cern oauth)
   */
  authenticateOnModal(){
    console.debug("open login modal");
    var self = this;
    this.set('modalLoginIsOpen', true);
    this.set('signingIn', true);

    Ember.run.schedule('afterRender', this, function () {

      self.get('torii').open('cern-oauth2').then(function (auth) {

        self.set("loginIsLoading", true);
        self.get('session').authenticate('authenticator:token', auth).then(function () {

          Ember.$(".login-modal").modal("hide");
          self.set("loginIsLoading", false);
          self.transitionTo('join-meeting');
        });

      });
    });

  },
  actions: {

    /**
     * Open login modal button
     */
    openLoginModal(){
      Ember.$(".login-modal").modal({
        observeChanges: true,
      }).modal("show");
      this.authenticateOnModal();
    },

    /**
     * Close login modal button
     */
    closeLoginModal(){
      Ember.$(".login-modal").modal("hide");
      this.set('modalLoginIsOpen', false);
      this.set('signingIn', false);
      this.set("loginIsLoading", false);
    }
  }

});
