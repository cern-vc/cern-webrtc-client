import Ember from 'ember';

export function not(params/*, hash*/) {
  if(params.length !== 1){
    throw new Error("Not helper must have 1 parameter only");
  }

  return !params[0];
}

export default Ember.Helper.helper(not);
