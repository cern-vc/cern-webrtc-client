import Ember from 'ember';
import MeetingManagerInitializer from 'cern-webrtc-client/initializers/meeting-manager';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | meeting manager', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  MeetingManagerInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
