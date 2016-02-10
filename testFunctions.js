;(function(){

  var forEachFuns = [
    accessAssignmentSubtraction
  ];

  module.exports = {
    forEachFuns : forEachFuns
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

})();
