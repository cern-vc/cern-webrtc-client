import Ember from 'ember';

export default Ember.Service.extend({

  participantUpdateEventDone(participants, currentMeetingKey){
    var self = this;
    return new Ember.RSVP.Promise(function (resolve) {
      Ember.run(function () {
        self.set('currentMeetingKey', currentMeetingKey);
        self.populateParticipantsList(participants, currentMeetingKey).then(function () {
          self.get('logger').debug("All participants populated");
          resolve();
        });
      });
    });
  },
  /**
   * Stores all the participants in the application store.
   * @param newParticipantsList
   * @param currentMeetingKey
   * @returns {*}
   */
  populateParticipantsList: function (newParticipantsList, currentMeetingKey) {
    var self = this;
    self.get('logger').debug("populateParticipantsList");
    var participantsIdsToKeep = [];
    return this.store.find('meeting', currentMeetingKey).then(function (meeting) {
      var oldParticipantsList = meeting.get('participants');

      newParticipantsList.forEach(function (participant) {
        var participantExist = false;
        oldParticipantsList.forEach(function (oldParticipant) {
          if (participant.uri === oldParticipant.get('uri')) {
            participantExist = true;
            participantsIdsToKeep.push(oldParticipant.get('id'));
          }
        });

        if (!participantExist) {
          var newParticipant = self.store.createRecord('participant', {
            name: participant.name,
            meeting: meeting,
            uri: participant.uri,
            index: participant.index,
            meetingKey: meeting.id
          });
          meeting.get('participants').addObject(newParticipant);
          participantsIdsToKeep.push(newParticipant.get('id'));
        }
      });
      oldParticipantsList.forEach(function (participant) {
        if (participant && (participantsIdsToKeep.indexOf(participant.get('id')) === -1)) {
          self.get('logger').debug("Want to disable chat: " + participant.get('uri'));
          self.get('chat-manager').disablePrivateChat(participant.get('uri'));
          participant.deleteRecord();
        }
      });
    });
  }
});
