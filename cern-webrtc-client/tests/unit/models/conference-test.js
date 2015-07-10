import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('meeting', 'Unit | Model | meeting', {
  // Specify the other units that are required for this test.
  needs: ["model:participant", "model:private-chat", "model:main-chat"]
});

test('it exists', function(assert) {

  const model = this.subject({name: "Meeting 1", isActive: true});

  assert.equal(model.get('name'), "Meeting 1", 'Name matches');
  assert.equal(model.get('isActive'), true, 'isActive matches');

  assert.ok(!!model);
});

test('should own a main-chat', function(assert) {
  const Meeting = this.store().modelFor('meeting');
  const relationship = Ember.get(Meeting, 'relationshipsByName').get('mainChat');

  assert.equal(relationship.key, 'mainChat', 'has relationship with main-chat');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});

test('should own private-chats', function(assert) {
  const Meeting = this.store().modelFor('meeting');
  const relationship = Ember.get(Meeting, 'relationshipsByName').get('privateChats');

  assert.equal(relationship.key, 'privateChats', 'has relationship with private-chat');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
});

test('should own participants', function(assert) {
  const Meeting = this.store().modelFor('meeting');
  const relationship = Ember.get(Meeting, 'relationshipsByName').get('participants');

  assert.equal(relationship.key, 'participants', 'has relationship with participant');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
});
