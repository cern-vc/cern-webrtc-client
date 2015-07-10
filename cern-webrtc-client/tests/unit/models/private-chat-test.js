import { moduleForModel, test } from 'ember-qunit';

moduleForModel('private-chat', 'Unit | Model | private chat', {
  // Specify the other units that are required for this test.
  needs: ["model:participant", "model:meeting", "model:message"]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
