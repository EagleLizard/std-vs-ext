;(function(){
  var _ = require('lodash');

  module.exports = {
    run : main
  };

  function main(data, fun){
    data.forEach(fun);
  }


})();
