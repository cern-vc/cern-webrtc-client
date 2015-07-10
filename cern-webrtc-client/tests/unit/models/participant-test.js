import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('participant', 'Unit | Model | participant', {
  // Specify the other units that are required for this test.
  needs: ["model:meeting"]
});

test('it exists', function(assert) {

  const model = this.subject({name: "Guest 1", uri: "ABC", index: 1});

  assert.equal(model.get('name'), "Guest 1", 'Name matches');
  assert.equal(model.get('uri'), 'ABC', 'Uri matches');
  assert.equal(model.get('index'), 1, 'Index matches');

  assert.ok(!!model);
});

test('should own a meeting', function(assert) {
  const Participant = this.store().modelFor('participant');
  const relationship = Ember.get(Participant, 'relationshipsByName').get('meeting');

  assert.equal(relationship.key, 'meeting', 'has relationship with meeting');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
