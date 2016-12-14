/**
 * Created by renefernandez on 06/06/16.
 */
import Base from 'ember-simple-auth/authenticators/base';
import Ember from "ember";
import config from '../config/environment';

export default Base.extend({
  restore: function(credentials) {
    return Ember.$.ajax({
      type: "POST",
      url: config.backend_server_url + "api/v1.0/auth/reauth/",
      contentType : 'application/json',
      data: JSON.stringify(credentials)
    });
  },
  authenticate: function(credentials) {
    return Ember.$.ajax({
      type: "POST",
      url: config.backend_server_url + "api/v1.0/auth/login/",
      contentType : 'application/json',
      data: JSON.stringify(credentials)
    });
  },
  invalidate(data) {
    return Ember.RSVP.resolve();
  }
});
