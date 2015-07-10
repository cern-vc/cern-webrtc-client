import Ember from 'ember';
import VidyoRequestsApiInitializer from 'cern-webrtc-client/initializers/vidyo-requests-api';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | vidyo requests api', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  VidyoRequestsApiInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
