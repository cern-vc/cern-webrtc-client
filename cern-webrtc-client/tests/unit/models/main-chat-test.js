import {moduleForModel, test} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('main-chat', 'Unit | Model | main chat', {
  // Specify the other units that are required for this test.
  needs: ["model:meeting", "model:message"]
});

test('it exists', function (assert) {
  const model = this.subject({name: "Chat 1", uri: "ABC"});

  assert.equal(model.get('name'), "Chat 1", 'Name matches');
  assert.equal(model.get('hasUnreadMessages'), false, 'hasUnreadMessages matches');
  assert.equal(model.get('isDisabled'), false, 'isDisabled matches');
  assert.equal(model.get('isVisible'), true, 'isVisible matches');
  assert.equal(model.get('uri'), 'ABC', 'Uri matches');

  assert.ok(!!model);
});

test('should own a meeting', function (assert) {
  const MainChat = this.store().modelFor('main-chat');
  const relationship = Ember.get(MainChat, 'relationshipsByName').get('meeting');

  assert.equal(relationship.key, 'meeting', 'has relationship with meeting');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});

test('should own messages', function (assert) {
  const MainChat = this.store().modelFor('main-chat');
  const relationship = Ember.get(MainChat, 'relationshipsByName').get('messages');

  assert.equal(relationship.key, 'messages', 'has relationship with message');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
});
