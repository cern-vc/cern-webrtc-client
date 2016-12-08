import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('downloads');
  this.route('tracked-route', {});
  this.route('meeting', { path: '/meetings/:id' });
  this.route('terms-of-use');
  this.route('help');
  this.route('join-meeting');
});

export default Router;
