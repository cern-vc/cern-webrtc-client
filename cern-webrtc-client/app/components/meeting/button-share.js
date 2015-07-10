import Ember from 'ember';
import TrackedComponent from '../tracked-component';

export default TrackedComponent.extend({

  isLocalSharing: Ember.computed.alias('sharing-manager.isLocalSharing'),
  transformedShares: Ember.computed.alias('sharing-manager.transformedShares'),
  shareCount: Ember.computed.alias('sharing-manager.numberOfShares'),
  checkShareLabel: true,

  shareCountChanged: function () {
    this.addSharingInfoToShareLabel();
    this.send('getSharingStatus');
  }.observes('shareCount'),

  addSharingInfoToShareLabel(){
    if (this.get('shareCount') < 1) {
      return;
    }

    Ember.run.later(function () {
      var shareName = Ember.$('#shareName').text();
      if (shareName) {
        shareName = shareName.replace(' - sharing screen', '');
        Ember.$("#shareVideoDiv").removeClass('hide');
        Ember.$('#shareName').text(shareName + ' - sharing screen');

      }
    }, 50);
  },

  checkShareLabelWhenJoining() {
    var self = this;
    this.set('checkShareLabel', true);

    Ember.run.later(function () {
      self.set('checkShareLabel', false);
    }, 2500);

    var recursiveShareLabelCheck = function (iterator) {
      if (self.get('checkShareLabel')) {
        self.addSharingInfoToShareLabel();
        Ember.run.later(function () {
          recursiveShareLabelCheck(iterator + 1);
        }, 50);
      }
    };
    recursiveShareLabelCheck(1);
  },

  /**
   * Opens the share info modal
   */
  openModalShareInfo() {
    this._trackEvent('button-share', 'openModalShareInfo');
    Ember.$("#modal-share").modal("show");
  },

  actions: {
    /**
     * It will open te modal window sharing screen. This require the Chrome extension to work.
     */
    shareScreen() {
      this._trackEvent('meeting-box', 'shareScreen');
      var self = this;
      DetectRTC.load(function () {
        if (DetectRTC.browser.isChrome || DetectRTC.browser.isFirefox) {
          self.set('isUsingCompatibleBrowser', true);
        }
        if (!self.get('isUsingCompatibleBrowser')) {
          self.openModalShareInfo();
        } else if (Ember.$('#vidyowebrtcscreenshare_is_installed').length === 0) {
          self.openModalShareInfo();
        } else {
          var sharingManger = self.get('sharing-manager');
          self.get('vidyo-requests-api').clientLocalShareStart(sharingManger.get('currentShareId'));
          sharingManger.setCurrentShareId(sharingManger.get('currentShareId') + 1);
        }
      });
    },

    /**
     * Action that takes place when a share is selected on the dropdown list
     * @param shareId
     */
    selectShare(shareId) {
      let self = this;
      this.get('vidyo-requests-api').clientSharesSetCurrent(shareId);
      this.addSharingInfoToShareLabel();
    },

    /**
     * Gets the current sharing status. This means that it will get all the shares from the Vidyo API to check if
     * someone is sharing.
     *
     * This will also get the current local sharing status to display the disconnect sharing on the template.
     */
    getSharingStatus() {
      var data = this.get('vidyo-requests-api').clientLocalSharesGet();
      var equals = (this.get('sharing-manager').get('currentShareId') === parseInt(data.sysDesktopId[0]));
      if (equals) {
        this.get('sharing-manager').setIsLocalSharing(true);
      }
    },

    /**
     * Stop sharing action
     */
    stopSharing() {
      this._trackEvent('meeting-box', 'stopSharing');
      this.get('vidyo-requests-api').clientLocalShareStop();
      this.get('sharing-manager').setIsLocalSharing(false);
    },

    /**
     * Wehther the user is sharing or not, we will get the sharing status and start/stop sharing if it corresponds.
     * */
    shareOrStopScreenSharing() {
      this.send('getSharingStatus');
      if (this.get('isLocalSharing')) {
        this.send('stopSharing');
      } else {
        this.send('shareScreen');
      }
    }
  }

});
