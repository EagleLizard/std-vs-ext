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

  var numData;

  main(process.argv[2]);

  function main(testId){
    var time;

    if(!isValidTestId(testId)){
      console.error(INVALID_TEST_IDENTIFIER);
      return;
    }

    numData = parseInt(Number(process.argv[3]), 10) || DEFAULT_NUM_DATA;

    switch(testId){
      case 'forEach':
        time = runTest(stdForEach,
                       testFuns.forEachFuns[0]);
        break;
      case '_forEach':
        time = runTest(lodashForEach,
                       testFuns.forEachFuns[0]);
        break;
      case 'map':
        time = runTest(stdMap,
                       testFuns.mapFuns[1]);
        break;
      case '_map':
        time = runTest(lodashMap,
                       testFuns.mapFuns[1]);
        break;
      case 'reverse':
        time = runTest(stdReverse);
      case '_reverse':
        time = runTest(lodashReverse);
    }
    console.log('Time to process ', formatNumber(numData), 'items (', testId, '):');
    console.log('\t>', formatNumber(time), 'ms');
  }

  function runTest(fun, innerFun){
    var data = gen.getRandomInts(numData);
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

  function isValidTestId(testId){
    return _.findIndex(VALID_IDENTIFIERS, function(id){
      return id == testId;
    }) !== -1;
  }

})();
