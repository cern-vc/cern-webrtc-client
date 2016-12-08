import Ember from 'ember';
import TrackedRoute from './tracked-route';
import config from '../config/environment';

export default TrackedRoute.extend({
  currentRouteName: 'join-meeting',
  modalHelpIsOpen: false,
  connectionFault: Ember.computed.alias('connection-manager.connectionFault'),
  alreadyLoaded: Ember.computed.alias('configuration-manager.alreadyLoaded'),

  actions: {
    redirectToMeeting (currentMeeting) {
      console.debug("index route redirectToMeeting");
      this.transitionTo('meeting', currentMeeting);
    },
    didTransition() {
      this._super(...arguments);
      console.debug('index: didTransition');
      if(config.environment === 'test'){
        return;
      }

      if(!this.get('alreadyLoaded')){
        this.transitionTo('index');
      }
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
