import DS from 'ember-data';
import Chat from './chat';

export default Chat.extend({
  participant: DS.belongsTo('participant')
});
