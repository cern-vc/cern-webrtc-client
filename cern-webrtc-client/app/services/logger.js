import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({

  buffer: [],
  logEnabled: false,

  /**
   * Will get the value of the query param by name
   * @param name Name of the query param.
   * @returns {*} Value of the query param.
   */
  getParameterByName: function (name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name.toLowerCase() + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search.toLowerCase());
    if (results == null) {
      return "";
    }
    else {
      return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  },

  logToBuffer(parameters){
    this.get('buffer').addObject(this.getCurrentDate() + JSON.stringify(arguments) + '\n');
  },

  init() {
    this._super(...arguments);
    let self = this;

    let enableLog = this.getParameterByName('logEnabled');

    if(enableLog === 'true' || enableLog === 'false'){
      this.set('logEnabled', enableLog);
    }

    console.log = function () {
      if (enableLog) {
        self.logToBuffer(arguments);
      } else if (config.environment === 'development') {
        Ember.Logger.log(self.getCurrentDate(), '[LOG]', arguments);
      }
    };
    console.debug = function () {
    if (config.environment === 'development') {
        Ember.Logger.debug(self.getCurrentDate(), '[DEBUG]', arguments);
      }
    };
    console.info = function () {
      if (enableLog) {
        self.logToBuffer(arguments);
      } else if (config.environment === 'development') {
        Ember.Logger.info(self.getCurrentDate(), '[INFO]', arguments);
      }
    };
    console.dir = function () {
      if (enableLog) {
        self.logToBuffer(arguments);
      } else if (config.environment === 'development') {
        Ember.Logger.debug(self.getCurrentDate(), '[DIR]', arguments);
      }
    };
    console.error = function () {
      if (config.environment !== 'development' && enableLog) {
        self.logToBuffer(arguments);
      } else if (config.environment === 'development'){
        Ember.Logger.error(self.getCurrentDate(), '[ERROR]', arguments);
      }
    };
  },

  getCurrentDate(){
    return '[' + new Date().toUTCString() + '] ';
  }

});
