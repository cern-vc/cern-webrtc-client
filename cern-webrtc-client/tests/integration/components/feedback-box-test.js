import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('feedback-box', 'Integration | Component | feedback box', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{feedback-box}}`);

  assert.notEqual(this.$().text().trim(), '');

  // Template block usage:
  // this.render(hbs`
  //   {{#feedback-box}}
  //     template block text
  //   {{/feedback-box}}
  // `);
  //
  // assert.equal(this.$().text().trim(), 'template block text');
});
