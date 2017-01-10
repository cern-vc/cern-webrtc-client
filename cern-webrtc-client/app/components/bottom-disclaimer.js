import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  appVersion: config.version,
  i18n: Ember.inject.service(),
  classNames: ['language-select'],
  currentYear: Ember.computed(function(){
    return new Date().getFullYear();
  }),
  locales: Ember.computed('i18n.locale', 'i18n.locales', function() {
    const i18n = this.get('i18n');
    return this.get('i18n.locales').map(function (loc) {
      return { id: loc, text: i18n.t('language-select.language.' + loc) };
    });
  }),

  actions: {
    setLocale() {
      this.set('i18n.locale', this.$('select').val());
    }
  }
});
