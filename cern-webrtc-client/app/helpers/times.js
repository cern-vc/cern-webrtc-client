import Ember from 'ember';

export function times(n/*, block/*, hash*/) {

  let new_array = new Array(n+1);
  for(let i = 0; i < n; ++i) {
   new_array[i] = i;
  }

  return new_array;
}

export default Ember.Helper.helper(times);
