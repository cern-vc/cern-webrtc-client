import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('top-navbar', 'Integration | Component | top navbar', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{top-navbar}}`);

  // assert.equal(this.$().text().trim(), 'CERN WebRTC Client beta');
  assert.notEqual(this.$().text().trim(), '');

  // Template block usage:
  // this.render(hbs`
  //   {{#top-navbar}}
  //     template block text
  //   {{/top-navbar}}
  // `);

  // assert.equal(this.$().text().trim(), 'template block text');
});
