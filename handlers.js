;(function(){

  var _ = require('lodash');

  module.exports = {
    forEach : {
      std    : stdForEach,
      lodash : lodashForEach
    },
    map     : {
      std    : stdMap,
      lodash : lodashMap
    },
    reverse : {
      std    : stdReverse,
      lodash : lodashReverse
    }
  };

  function stdForEach(data, fun){
    data.forEach(fun);
  }

  function lodashForEach(data, fun){
    _.forEach(data, fun);
  }

  function stdMap(data, fun){
    data.map(fun);
  }

  function lodashMap(data, fun){
    _.map(data, fun);
  }

  function stdReverse(data){
    data.reverse();
  }

  function lodashReverse(data){
    _.reverse(data);
  }

})();
