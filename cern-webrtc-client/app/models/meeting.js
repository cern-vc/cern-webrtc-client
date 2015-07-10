import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  isActive: DS.attr('boolean'),
  participants: DS.hasMany('participant'),
  privateChats: DS.hasMany('private-chat'),
  mainChat: DS.belongsTo('main-chat'),
});
