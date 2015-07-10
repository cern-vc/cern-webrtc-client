import DS from 'ember-data';

export default DS.Model.extend({
  meeting: DS.belongsTo('meeting'),
  messages: DS.hasMany('message'),
  name: DS.attr('string'),
  hasUnreadMessages: DS.attr('boolean', {defaultValue: false}),
  isDisabled: DS.attr('boolean', {defaultValue: false}),
  isVisible: DS.attr('boolean', {defaultValue: true}),
  uri: DS.attr('string', {defaultValue: ""})
});
