import DS from 'ember-data';

export default DS.Model.extend({
    text: DS.attr('string'),
    chat: DS.belongsTo('chat'),
    sender: DS.attr('string'),
    uri: DS.attr('string')
});
