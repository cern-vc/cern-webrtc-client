import { not } from 'cern-webrtc-client/helpers/not';
import { module, test } from 'qunit';

module('Unit | Helper | not');

// Replace this with your real tests.
test('it expects true', function(assert) {
  let result = not([false]);
  assert.ok(result , "Expected true");
});

test('it expects false', function(assert) {
  let result = not([true]);
  assert.ok(!result , "Expected false");
});
