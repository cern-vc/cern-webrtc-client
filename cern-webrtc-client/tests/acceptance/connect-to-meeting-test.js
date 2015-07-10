import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'cern-webrtc-client/tests/helpers/module-for-acceptance';
import startApp from 'cern-webrtc-client/tests/helpers/start-app';

var application, container, connectionManager, usernameGenerator, pluginManager;

moduleForAcceptance('Acceptance | connect to meeting', {
    beforeEach: function () {
      this.application = startApp();
      application = this.application;
      container = application.__container__;
      connectionManager = container.lookup('service:connection-manager');
      usernameGenerator = container.lookup('service:username-generator');
      pluginManager = container.lookup('service:plugin-manager');
    },

    afterEach: function () {
      Ember.run.later(this.application, 'destroy');
    }
  }
);

test('visiting /meeting', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    let key = "BlaeOhnXvXWfN7HG53I2aKTbqeY";
    let username = usernameGenerator.generateRandomUsername();

    fillIn("input#roomUrl", "https://vidyoportal.cern.ch/flex.html?roomdirect.html&key=" + key);
    // assert.notEqual(username, '');
    fillIn("input#guestName", username);

    andThen(function () {
      assert.equal(connectionManager.get('isJoining'), false);
    });
    //
    click('button#connect-meeting-guest');
    //
    andThen(function () {
       assert.equal(connectionManager.get('isConnected'), true);
    });

    andThen(function () {
      assert.equal(connectionManager.get('isJoining'), false);
    });

    andThen(function () {
      click('button#disconnect-button');
      assert.ok(true);
    });

    andThen(function () {
      assert.equal(connectionManager.get('isJoining'), false);
    });

    andThen(function () {
       assert.equal(connectionManager.get('isConnected'), false);
    });

  });
});

// test('visiting /conference', function (assert) {
//   //var usernameGenerator = new UsernameGenerator();
//   visit('/');
  // andThen(function () {
  //   assert.equal(currentURL(), '/');
  //   let key = "BlaeOhnXvXWfN7HG53I2aKTbqeY";
  //   let username = usernameGenerator.generateRandomUsername();
  //
  //   fillIn("input#roomUrl", "https://vidyoportal.cern.ch/flex.html?roomdirect.html&key=" + key);
  //   //assert.notEqual(username, '');
  //   fillIn("input#guestName", username);
  //   andThen(function () {
  //     assert.equal(connectionManager.get('isJoining'), false);
  //   });
  //
  //   click('button#connect-meeting-guest');
  //
  //
  //   andThen(function () {
  //     assert.equal(mockupEventHelper.get('isConnected'), true);
  //   });
  //
  //   andThen(function () {
  //     assert.equal(connectionManager.get('isJoining'), false);
  //   });
  //
  //
  //   andThen(function () {
  //     assert.equal(mockupEventHelper.sayHello(), "Hello, it's me, I was wondering if after all these years you'd like to meet");
  //   });
  //
  //
  //   andThen(function () {
  //     assert.equal(mockupEventHelper.get('isConnected'), true);
  //   });
  //
  //   andThen(function () {
  //     click('a#disconnect-button');
  //     assert.ok(true);
  //   });
  //
  // });
// });
