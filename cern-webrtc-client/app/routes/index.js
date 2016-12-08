import Ember from 'ember';
import TrackedRoute from './tracked-route';
import config from '../config/environment';

export default TrackedRoute.extend({
  currentRouteName: 'index',
  alreadyLoaded: Ember.computed.alias('configuration-manager.alreadyLoaded'),

  /**
   * Initializes the application
   */
  alreadyLoadedChanged: Ember.observer('alreadyLoaded', function () {
    this.get('plugin-manager').vidyoPluginLoad();
  }),

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
    redirectToJoinMeeting(){
      console.debug("Redirecting to join meeting screen...");
      this.transitionTo('join-meeting');
    }
  }

});
