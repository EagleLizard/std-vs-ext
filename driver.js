;(function(){
  var stdForEach = require('./forEach_std').run;
  var lodashForEach = require('./forEach_lodash').run;
  var gen = require('./generator');
  var testFuns = require('./testFunctions');

  var _ = require('lodash');

  var NUM_DATA = 1e6;//6e7;

  var VALID_IDENTIFIERS = [
    'forEach',
    '_forEach',
    'map',
    '_map'
  ];

  var TEST_ID_ENUM = {
    FOR_EACH        : VALID_IDENTIFIERS[0],
    LODASH_FOR_EACH : VALID_IDENTIFIERS[1],
    MAP             : VALID_IDENTIFIERS[2],
    LODASH_MAP      : VALID_IDENTIFIERS[3]
  };

  var INVALID_TEST_IDENTIFIER = "Invalid test identifier specified.";

  main(process.argv[2]);

  function main(testId){
    var data, isValidTestId, time;

    console.log(testId);

    isValidTestId = _.findIndex(VALID_IDENTIFIERS, function(id){
      return id == testId;
    });

    if(isValidTestId === -1){
      console.log(INVALID_TEST_IDENTIFIER);
      return;
    }

    data = gen.getRandomInts(NUM_DATA);
    
    switch(testId){
      case 'forEach':
        time = runTest(data, stdForEach, testFuns.forEachFuns[0]);
        break;
      case '_forEach':
        time = runTest(data, lodashForEach, testFuns.forEachFuns[1]);
        break;
      case 'map':
        break;
      case '_map':
        break;
    }
    console.log('Time to process ', formatNumber(NUM_DATA), 'items (', testId, '):');
    console.log('\t>', formatNumber(time), 'ms');
  }

  function runTest(data, fun, innerFun){
    var start = _.now();
    fun(data, innerFun);
    return _.now() - start;
  }

  function formatNumber(num){
    var newNum = [];
    var numStr = ''.concat(num);
    if(numStr.length <= 3){
      return numStr;
    }
    num = numStr.split('').reverse();
    _.forEach(num, function(val, idx){
      newNum.push(val)
      if((idx+1)%3 == 0){
        newNum.push(',');
      }
    });

    return newNum.reverse().join('');
  }

})();