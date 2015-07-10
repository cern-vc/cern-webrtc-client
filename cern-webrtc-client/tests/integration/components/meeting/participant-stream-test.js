import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('meeting/participant-stream', 'Integration | Component | meeting/participant stream', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{meeting/participant-stream}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  // this.render(hbs`
  //   {{#meeting/participant-stream}}
  //     template block text
  //   {{/meeting/participant-stream}}
  // `);
  //
  // assert.notEqual(this.$().text().trim(), 'template block text');
});
