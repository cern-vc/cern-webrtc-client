import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({

  debug: function(args){
    if(config.environment === 'development'){
      Ember.Logger.debug(args);
    }
  },
  error: function(args){
    if(config.environment === 'development'){
      Ember.Logger.error(args);
    }
  }

});
