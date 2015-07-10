import { isBigger } from 'cern-webrtc-client/helpers/is-bigger';
import { module, test } from 'qunit';

module('Unit | Helper | is bigger');

test('it is not bigger', function(assert) {
  let result = isBigger([0, 42]);
  assert.notOk(result);
});

test('it is bigger', function(assert) {
  let result = isBigger([42, 0]);
  assert.ok(result);
});

test('it is not bigger, it is the same', function(assert) {
  let result = isBigger([42, 42]);
  assert.notOk(result);
});
