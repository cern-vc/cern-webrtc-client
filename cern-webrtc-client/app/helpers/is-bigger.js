import Ember from 'ember';

export function isBigger(params/*, hash*/) {

  if(params.length !== 2){
    throw new Error("Compare helper must have 2 parameters");
  }

  return (params[0] > params[1]);
}

export default Ember.Helper.helper(isBigger);
