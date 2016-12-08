import Ember from 'ember';

export default Ember.Component.extend({
  shareCount: Ember.computed.alias('sharing-manager.numberOfShares'),
  shareWindow: false,
  isShareWindowDilgOpen: false,

  actions:{
    detachShare(){
      console.debug("Detach");

      var self = this;
      var elem = document.getElementById("shareVideo0");
      var vidSrc = elem.getAttribute("src");
      if (!vidSrc) {
        vidSrc = URL.createObjectURL(elem.srcObject);
      }
      let shareName = Ember.$("#shareName").text();

      let height = screen.height/2;
      let width = screen.width/2;

      var left = (screen.width/2)-(width/2);
      var top = (screen.height/2)-(height/2);

      var shareWindow = window.open("/screen-share.html", "mywindow", "location=1,toolbar=1,menubar=1,resizable=1,width="+width+",height="+height+", top="+top+",left="+left+"");
      this.set('shareWindow', shareWindow);
      this.set('isShareWindowDilgOpen', true);
      console.debug('isShareWindowDilgOpen');
      window.addEventListener("message", function (evt) {
        self.get('shareWindow').postMessage([vidSrc, undefined], "*");
      }, false);
      this.get('shareWindow').addEventListener('beforeunload', function () {
        self.set('isShareWindowDilgOpen', false);

        self.set('shareWindow', undefined);
        console.debug('isShareWindowDilgClosed');
      });
    }
  }
});
