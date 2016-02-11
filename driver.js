;(function(){
  var stdForEach    = require('./handlers').forEach.std;
  var lodashForEach = require('./handlers').forEach.lodash;
  var stdMap        = require('./handlers').map.std;
  var lodashMap     = require('./handlers').map.lodash;
  var stdReverse    = require('./handlers').reverse.std;
  var lodashReverse = require('./handlers').reverse.lodash;

  var gen      = require('./generator');
  var testFuns = require('./testFunctions');

  var _ = require('lodash');

  var DEFAULT_NUM_DATA = 1e7;
  var DEFAULT_NUM_TESTS = 1;

  var VALID_IDENTIFIERS = [
    'forEach',
    '_forEach',
    'map',
    '_map',
    'reverse',
    '_reverse'
  ];

  var TEST_ID_ENUM = {
    FOR_EACH        : VALID_IDENTIFIERS[0],
    LODASH_FOR_EACH : VALID_IDENTIFIERS[1],
    MAP             : VALID_IDENTIFIERS[2],
    LODASH_MAP      : VALID_IDENTIFIERS[3],
    REVERSE         : VALID_IDENTIFIERS[4],
    LODASH_REVERSE  : VALID_IDENTIFIERS[5]
  };

  var INVALID_TEST_IDENTIFIER = "Invalid test identifier specified.";

  var numData, numTests;

  main(process.argv[2]);

  function main(testId){
    var time;

    if(!isValidTestId(testId)){
      console.error(INVALID_TEST_IDENTIFIER);
      return;
    }

    numData  = parseInt(process.argv[3], 10) || DEFAULT_NUM_DATA;
    numTests = parseInt(process.argv[4], 10) || DEFAULT_NUM_TESTS;

    switch(testId){
      case 'forEach':
        time = runTests(stdForEach,
                       testFuns.forEachFuns[0]);
        break;
      case '_forEach':
        time = runTests(lodashForEach,
                       testFuns.forEachFuns[0]);
        break;
      case 'map':
        time = runTests(stdMap,
                       testFuns.mapFuns[1]);
        break;
      case '_map':
        time = runTests(lodashMap,
                       testFuns.mapFuns[1]);
        break;
      case 'reverse':
        time = runTests(stdReverse);
        break;
      case '_reverse':
        time = runTests(lodashReverse);
        break;
    }
    console.log('Avg. time to process ', formatNumber(numData), 'items over ',numTests,' tests (', testId, '):');
    console.log('\t>', formatNumber(time), 'ms');
  }

  function runTests(fun, innerFun){
    var data;
    var results = [];
    for(var it=0; it<numTests; ++it){
      results.push(runTest(fun, innerFun, data));
      console.log('Test #', it+1, ' complete');
    }
    return _.reduce(results, function(acc, curr){
      return acc+curr;
    }, 0)/results.length;
  }

  function runTest(fun, innerFun, data){
    var undef;
    var data = gen.getRandomInts(numData, undef, Number.MAX_SAFE_INTEGER, data);
    var start = _.now();
    fun(data, innerFun);
    return _.now() - start;
  }

  function formatNumber(num){
    var newNum = [];
    var numStr = ''.concat(num);
    var dotIdx, splitNumber, mantissa;
    if(numStr.length <= 3){
      return numStr;
    }
    dotIdx = numStr.indexOf('.');
    if(dotIdx !== -1){
      splitNumber = numStr.split('.');
      numStr = splitNumber[0];
      mantissa = splitNumber[1];
    }
    numStr = numStr.split('').reverse();
    _.forEach(numStr, function(val, idx, arr){
      newNum.push(val)
      if((idx+1)%3 == 0 && idx != arr.length-1){
        newNum.push(',');
      }
    });
    newNum = newNum.reverse().join('')
    if(dotIdx !== -1){
      newNum = [newNum, mantissa].join('.');
    }
    return newNum;
  }

  function isValidTestId(testId){
    return _.findIndex(VALID_IDENTIFIERS, function(id){
      return id == testId;
    }) !== -1;
  }

})();
