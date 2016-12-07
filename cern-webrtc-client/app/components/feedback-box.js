import Ember from 'ember';

export default Ember.Component.extend({
  logContent: Ember.computed.alias('logger.buffer'),

  getCurrentDate(){
    return '[' + new Date().toUTCString() + '] ';
  },

  actions:{
    clearLog(){
      this.set('logContent', []);
    },
    download() {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.get('logContent')));
      element.setAttribute('download', this.getCurrentDate()+'_webrtc_log.txt');

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
  }
});
