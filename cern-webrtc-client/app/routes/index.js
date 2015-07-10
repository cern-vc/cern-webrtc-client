import Ember from 'ember';
import TrackedRoute from './tracked-route';
import config from '../config/environment';

export default TrackedRoute.extend({
  currentRouteName: 'index',
  modalHelpIsOpen: false,
  connectionFault: Ember.computed.alias('connection-manager.connectionFault'),

  alreadyLoaded: Ember.computed.alias('configuration-manager.alreadyLoaded'),

  alreadyLoadedChanged: Ember.observer('alreadyLoaded', function () {
    this.get('plugin-manager').vidyoPluginLoad();
    if (this.get('alreadyLoaded') === true) {
      Ember.run.later(function () {
        Ember.$('#loadingAppModal').modal("hide");
      }, 2000);
    }
  }),


  /**
   * Initializes the application
   */
  activate(){

    if (config.environment === "test") {
      this.get('plugin-manager').vidyoPluginLoad();
    } else {

      if (!this.get('configuration-manager').get("alreadyLoaded")) {
        Ember.run.schedule("afterRender", this, function () {
          Ember.$(document).ready(function () {
            Ember.$('#loadingAppModal').modal({
              closable: false,
              observeChanges: true
            }).modal('show');
          });
        });
      }
      this.get('configuration-manager').verifyConfiguration();
    }
  },

  actions: {
    redirectToMeeting (currentMeeting) {
      this.get('logger').debug("index route redirectToMeeting");
      this.transitionTo('meeting', currentMeeting);
    },
    didTransition() {
      this._super(...arguments);
      this.get('logger').debug('index: didTransition');
    },
    /**
     * Takes the user to the Vidyoportal URL. If there is a key on the query, it is added to the portal URL.
     */
    goToVidyoPortal(){
      var vidyoPortalUrl = 'https://vidyoportal.cern.ch/';
      var roomKey = this.get('queryParamManager').getParameterByName('key');

      if (roomKey !== '') {
        vidyoPortalUrl = vidyoPortalUrl + "flex.html?roomdirect.html&key=" + roomKey;
      }
      Ember.$('#loadingAppModal').modal("hide");
      window.location.replace(vidyoPortalUrl);
    },

    /**
     * Takes the user to the downloads page.
     */
    goToDownloads(){
      Ember.$('#loadingAppModal').modal("hide");
      this.transitionTo('downloads');
    }
  }
});
