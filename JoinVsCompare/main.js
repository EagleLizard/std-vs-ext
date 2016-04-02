;(function(){
  var strGen = require('./../generator.js').getRandomStrings;
  var _ = require('lodash');

  var NUM_TESTS;
  var NUM_DATA = 100;
  var STR_LENGTH = 10;

  var TESTS = [
    'JOIN',
    'CONCAT',
    'ASSIGN'
  ];

  var TEST_MAP = {
    JOIN : testJoin,
    CONCAT : testConcat,
    ASSIGN : testAssign
  };

  main();

  function main(){
    NUM_TESTS = +process.argv[2];
    NUM_DATA = +(process.argv[3] || NUM_DATA);
    STR_LENGTH = +(process.argv[4] || STR_LENGTH);
    if(isNaN(NUM_TESTS)
    || isNaN(NUM_DATA)
    || isNaN(STR_LENGTH)){
      console.log('Invalid number.');
    }else{
      runTests(NUM_TESTS);
    }
  }

  function runTests(n){
    console.log();
    _.forEach(TESTS, function(test){
      var results = [];
      var start, data, sum;
      for(var i=0; i<n; ++i){
        data = strGen(NUM_DATA, STR_LENGTH);
        start = _.now();
        TEST_MAP[test](data);
        results.push(_.now()-start);
      }
      sum = _.reduce(results, function(acc,curr){
          return acc + (curr/n);
      },0);
      printResults(test, sum);
    });
    console.log();
  }

  function printResults(testName, timeSum){
    console.log('Results for ', testName, ' after ', NUM_TESTS,' tests with:\n'
                , 'datasets of length ', NUM_DATA,'\n'
                , 'containing strings of length ', STR_LENGTH, ':\n'
                , '\t',timeSum,'ms');
  }

  function testJoin(strList){
    return strList.join('');
  }

  function testConcat(strList){
    var result = '';
    for(var i=0; i<strList.length; ++i){
      result = result.concat(strList[i]);
    }
    return result;
  }

  function testAssign(strList){
    var result = '';
    for(var i=0; i<strList.length; ++i){
      result += strList[i];
    }
    return result;
  }

})();
