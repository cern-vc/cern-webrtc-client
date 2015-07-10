import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    /**
     * Closes the help modal
     */
    closeHelpModal(){
      Ember.$('#modal-help').modal("hide");
    }
  }
});
