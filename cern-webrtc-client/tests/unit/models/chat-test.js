import { moduleForModel, test } from 'ember-qunit';

moduleForModel('chat', 'Unit | Model | chat', {
  // Specify the other units that are required for this test.
  needs: ["model:meeting", "model:message"]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
