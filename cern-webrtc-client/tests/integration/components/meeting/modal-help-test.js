import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('meeting/modal-help', 'Integration | Component | meeting/modal help', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{meeting/modal-help}}`);

  assert.notEqual(this.$().text().trim(), '');

  // Template block usage:
  // this.render(hbs`
  //   {{#meeting/modal-help}}
  //     template block text
  //   {{/meeting/modal-help}}
  // `);
  //
  // assert.equal(this.$().text().trim(), 'template block text');
});
