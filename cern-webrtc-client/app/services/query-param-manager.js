import Ember from 'ember';

export default Ember.Service.extend({
  /**
   * Will get the value of the query param by name
   * @param name Name of the query param.
   * @returns {*} Value of the query param.
   */
  getParameterByName: function (name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name.toLowerCase() + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search.toLowerCase());
    if (results == null) {
      return "";
    }
    else {
      return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  },
});
