import { isEqual } from 'cern-webrtc-client/helpers/is-equal';
import { module, test } from 'qunit';

module('Unit | Helper | is equal');

// Replace this with your real tests.
test('it equal', function(assert) {
  let result = isEqual([42, 42]);
  assert.ok(result);
});

test('it is equal', function(assert) {
  let result = isEqual([42, 22]);
  assert.notOk(result);
});
