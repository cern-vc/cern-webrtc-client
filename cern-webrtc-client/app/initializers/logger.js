import Logger from '../services/logger';

export function initialize(application) {
  application.register('logger:main', Logger);
  application.inject('route', 'logger', 'logger:main');
  application.inject('component', 'logger', 'logger:main');
  application.inject('service', 'logger', 'logger:main');
  application.inject('helper', 'logger', 'logger:main');
  application.inject('controller', 'logger', 'logger:main');
}

export default {
  name: 'logger',
  initialize
};
