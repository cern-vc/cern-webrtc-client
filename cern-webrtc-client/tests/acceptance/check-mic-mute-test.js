import Ember from 'ember';
import {test} from 'qunit';
import moduleForAcceptance from 'cern-webrtc-client/tests/helpers/module-for-acceptance';
import startApp from 'cern-webrtc-client/tests/helpers/start-app';

var application, container, connectionManager, usernameGenerator, pluginManager, meetingManager;

moduleForAcceptance('Acceptance | check audio mute', {
  beforeEach: function () {
    this.application = startApp();
    application = this.application;
    container = application.__container__;
    connectionManager = container.lookup('service:connection-manager');
    meetingManager = container.lookup('service:meeting-manager');
    usernameGenerator = container.lookup('service:username-generator');
    pluginManager = container.lookup('service:plugin-manager');
  },

  afterEach: function () {
    Ember.run.later(this.application, 'destroy');
  }
});

test('checking microphone mute', function (assert) {
  visit('/join-meeting');

  andThen(function () {
    assert.equal(currentURL(), '/join-meeting');
  });

  andThen(function () {
    assert.equal(currentURL(), '/join-meeting');
    let key = "BlaeOhnXvXWfN7HG53I2aKTbqeY";
    let username = usernameGenerator.generateRandomUsername();

    fillIn("input#roomUrl", "https://vidyoportal.cern.ch/flex.html?roomdirect.html&key=" + key);
    // assert.notEqual(username, '');
    fillIn("input#guestName", username);

    andThen(function () {
      assert.equal(meetingManager.get('isMutedMic'), false);
    });

    click('button#connect-meeting-guest');

    andThen(function () {
      assert.equal(connectionManager.get('isConnected'), true);
    });

    andThen(function () {
      assert.equal(meetingManager.get('isMutedMic'), false);
    });

    andThen(function () {
      click('button#mute-mic-button');
      assert.ok(true);
    });

    andThen(function () {
      assert.equal(meetingManager.get('isMutedMic'), true);
    });

    andThen(function () {
      click('button#disconnect-button');
      assert.ok(true);
    });


  });
});
