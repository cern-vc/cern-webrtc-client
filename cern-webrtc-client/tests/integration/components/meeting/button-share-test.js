import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('meeting/button-share', 'Integration | Component | meeting/button share', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{meeting/button-share}}`);

  assert.notEqual(this.$().text().trim(), '');

  // Template block usage:
  // this.render(hbs`
  //   {{#meeting/button-share}}
  //     template block text
  //   {{/meeting/button-share}}
  // `);
  //
  // assert.equal(this.$().text().trim(), 'template block text');
});
