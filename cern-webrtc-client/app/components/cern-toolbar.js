import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  torii: Ember.inject.service('torii'),
  modalLoginIsOpen: false,
  signingIn: false,
  loginIsLoading: false,

  /**
   * Authenticates the user using cern-oauth2 and token (against the backend with the retrieved code from cern oauth)
   */
  authenticateOnModal(){
    this.get('logger').debug("open login modal");
    var self = this;
    this.set('modalLoginIsOpen', true);
    this.set('signingIn', true);

    Ember.run.schedule('afterRender', this, function () {

      self.get('torii').open('cern-oauth2').then(function (auth) {

        self.set("loginIsLoading", true);
        self.get('session').authenticate('authenticator:token', auth).then(function () {

          Ember.$(".login-modal").modal("hide");
          self.set("loginIsLoading", false);
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
    },

    /**
     * Prevents the default link behavior
     */
    doNothing(){

    },

    /**
     * Clears the session data after logout.
     */
    invalidateSession() {
      if (config.environment !== 'development' && config.environment !== 'testing') {
        this.get('session').invalidate();
      } else {
        this.get('session').set('data.dummyAuthenticated', false);
      }
    }
  }
});
