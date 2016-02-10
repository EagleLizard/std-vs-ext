;(function(){

  module.exports = {
    run : main
  };

  function main(data, fun){
    data.map(fun);
  }

})();
