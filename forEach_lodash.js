;(function(){
  var _ = require('lodash');

  module.exports = {
    run : main
  };

  function main(data, fun){
    _.forEach(data, fun);
  }

})();
