;(function(){

  var forEachFuns = [
    accessAssignmentSubtraction
  ];

  var mapFuns = [
    indexModulo,
    indexDecrement
  ];

  module.exports = {
    forEachFuns : forEachFuns,
    mapFuns     : mapFuns
  };

  /*
    ----------------------------------
      FOREACH FUNCTION DEFINITIONS
    ----------------------------------
  */

  function accessAssignmentSubtraction(val, idx, arr){
    arr[idx] = val-idx;
  }

  function increment(val, idx, arr){
    ++arr[idx];
  }

  /*
    ----------------------------
      MAP FUNCTION DEFINITIONS
    ----------------------------
  */

  function indexModulo(val, idx){
    return val%idx;
  }

  function indexDecrement(val, idx){
    return val-idx;
  }

})();
