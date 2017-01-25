import Ember from 'ember';

export default Ember.Route.extend({
  /**
   * If the user browser is webrtc capable, then load the vidyo plugin.
   */
  session: Ember.inject.service('session'),
  queryParamManager: Ember.inject.service('query-param-manager'),
  i18n: Ember.inject.service(),
  locales: Ember.computed('i18n.locales', function() {
    const i18n = this.get('i18n');
    return this.get('i18n.locales');
  }),

  activate(){
    let userLang = (navigator.language || navigator.userLanguage).split("-");
    if(userLang.length > 0){
      userLang = userLang[0];
    }

    if(Ember.$.inArray(userLang, this.get('locales')) !== -1){
      this.set('i18n.locale', userLang);
    }

  }
});
