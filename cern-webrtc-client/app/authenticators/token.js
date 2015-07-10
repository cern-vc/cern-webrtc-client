/**
 * Created by renefernandez on 06/06/16.
 */
import Base from 'ember-simple-auth/authenticators/base';
import Ember from "ember";

export default Base.extend({
  restore: function(credentials) {
    return Ember.$.ajax({
      type: "POST",
      url: "/backend/api/v1.0/auth/reauth/",
      contentType : 'application/json',
      data: JSON.stringify(credentials)
    });
  },
  authenticate: function(credentials) {
    return Ember.$.ajax({
      type: "POST",
      url: "/backend/api/v1.0/auth/login/",
      contentType : 'application/json',
      data: JSON.stringify(credentials)
    });
  },
  invalidate(data) {
    return Ember.RSVP.resolve();
  }
});
