;(function(){

  var _ = require('lodash');

  module.exports = {
    getRandomInts : getRandomInts
  };

  function getRandomInts(n, min, max, recycledArr){
    var ints = recycledArr || new Array(n);
    n = (_.isUndefined(recycledArr))? n : recycledArr.length;
    for(var i=0; i<n; ++i){
      ints[i]= randInt(min, max);
    }
    return ints;
  }

  function randInt(min, max) {
    if(_.isUndefined(max)){
      max = min;
      min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

})();
