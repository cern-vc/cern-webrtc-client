/**
 * Created by renefernandez on 21/01/16.
 */
import Ember from 'ember';
import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';

export default ToriiAuthenticator.extend({
  torii: Ember.inject.service(),
  serverTokenEndpoint: 'https://oauth.web.cern.ch/OAuth/Token'
});
