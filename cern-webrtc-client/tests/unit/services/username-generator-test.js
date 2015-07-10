import { moduleFor, test } from 'ember-qunit';

moduleFor('service:username-generator', 'Unit | Service | username generator', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});


test('Service username generator exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

test('It generates a name', function(assert) {
  var service = this.subject();

  var generatedName = service.generateRandomUsername();
  assert.ok(generatedName);
  assert.ok(generatedName !== '');
});

test('Names should be smaller than 41 char', function(assert) {
  var service = this.subject();

  var generatedName = service.generateRandomUsername();
  assert.ok(generatedName);
  assert.ok(generatedName.length < 41);
});
