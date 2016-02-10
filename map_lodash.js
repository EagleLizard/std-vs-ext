;(function(){

  var _ = require('lodash');

  module.exports = {
    run : main
  };

  function main(data, fun){
    _.map(data, fun);
  }

})();
