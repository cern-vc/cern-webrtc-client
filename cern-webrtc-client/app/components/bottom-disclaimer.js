import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  appVersion: config.version,
  currentYear: Ember.computed(function(){
    return new Date().getFullYear();
  })
});
