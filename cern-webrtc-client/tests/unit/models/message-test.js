import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('message', 'Unit | Model | message', {
  // Specify the other units that are required for this test.
  needs: ["model:chat"]
});

test('it exists', function(assert) {

  const model = this.subject({text: "This is the message body", uri: "ABC", sender: "Guest name"});

  assert.equal(model.get('text'), "This is the message body", 'Name matches');
  assert.equal(model.get('uri'), 'ABC', 'Uri matches');
  assert.equal(model.get('sender'), "Guest name", 'sender matches');

  assert.ok(!!model);
});

test('should own a chat', function(assert) {
  const Message = this.store().modelFor('Message');
  const relationship = Ember.get(Message, 'relationshipsByName').get('chat');

  assert.equal(relationship.key, 'chat', 'has relationship with chat');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
