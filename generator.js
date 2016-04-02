;(function(){

  var _ = require('lodash');

  var tests = {
    intDistribution : intDistributionTest,
    float           : floatTest,
    bitAccuracy     : bitAccuracyTest

  };

  module.exports = {
    getRandomInts    : getRandomInts,
    getRandomString  : getRandomString,
    getRandomStrings : getRandomStrings,
    getRandomFloat   : randFloat,
    getRandomFloats  : getRandomFloats,
    tests            : tests
  };

  /* -- CONSTANTS -- */
  var DEFAULT_RAND_STRING_SET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  /*
    @param n int number of strings to generate
    @param length int|Object{low,high} a length if an int, or a range passed in as an object
    @param stringSet Array<String> an array of string used to compose the new random string
  */
  function getRandomStrings(n, strLength, stringSet){
    var randStrings = [];
    for(var i=0; i<n; ++i){
      randStrings.push(getRandomString(strLength, stringSet));
    }
    return randStrings;
  }
  /*
    @param length int|Object{low, high} a length if an int, or a range passed in as an object
    @param stringSet Array<String> an array of string used to compose the new random string
  */
  function getRandomString(length, stringSet){
    length = !isNaN(parseInt(length, 10)) ? length
                                         : randInt(length.low, length.high) ;
    stringSet = stringSet || DEFAULT_RAND_STRING_SET;
    var randStrIdx;
    var results = [];
    for(var i=0; i<length; ++i){
      //pick a random string
      randStrIdx = randInt(stringSet.length-1);
      results.push(stringSet[randStrIdx]);
    }
    return results.join('');
  }

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

  function getRandomFloats(n){
    var result = [];
    for(var i=0;i<n;++i) result.push(randFloat());
    return result;
  }

  //we're going to hack together a double precision float from a bit string
  // A more efficient option would be to use typed arrays and buffers
  function randFloat(){
    return bitArrayToDouble( getRandomStrings(64,1,['0','1']) );
  }

  function bitArrayToDouble(bits){
    var sign,exponent,fraction;
    sign = +bits[0];
    exponent = +parseInt(bits.slice(1,12).join(''),2);
    fraction = +_.reduce(bits.slice(12),function(acc,curr,idx){
      return +(+acc + (+curr*Math.pow(+2,+-1*(+idx+ +1))));
    },+1);
    return +Math.pow(-1,sign)*fraction*Math.pow(+2,exponent-1023);
  }

  /*
      -----------------
      ----- TESTS -----
      -----------------
  */

  function assert(expression,failMessage){
    if(!expression) console.error(failMessage);
  }

  function floatTest(n){
    for(var i=0; i<n; ++i){
      console.log(randFloat());
    }
  }

  function bitAccuracyTest(){
    var maxValueBits, maxValueTestResult
        , minValueBits, minValueTestResult;
    maxValueBits = '0111111111101111111111111111111111111111111111111111111111111111'.split('');
    maxValueTestResult = bitArrayToDouble(maxValueBits);
    console.log(maxValueTestResult);
    assert(maxValueTestResult===Number.MAX_VALUE, 'bitArrayToDouble failed on MAX_VALUE');
    minValueBits = '0000000000000000000000000000000000000000000000000000000000000001'.split('');
    minValueTestResult = bitArrayToDouble(minValueBits);
    console.log(minValueTestResult);
    assert(minValueTestResult===Number.MIN_VALUE, 'bitArrayToDouble failed on MIN_VALUE');
  }

  // This test is intended to dtermine if the distribution of
  //  randInt is uniform
  function intDistributionTest(n){
    var rangeCounters = [];
    var range = {
      low  : 0,
      high : 10
    };
    var mean, variance, stdDev;
    console.log('Beginning distribution tests with ',n,'iterations...');
    //init the counter array
    for(var i=range.low; i<range.high+1; ++i){
      rangeCounters.push(0);
    }
    for(var i=0; i<n; ++i){
      rangeCounters[randInt(range.low,range.high)]++;
    }
    console.log('Percentage distributions:')
    _.forEach(rangeCounters, function(val,idx){
      console.log('\t',idx,' - ',(val/n)*100,'%');
    });
    console.log('Variance of distributions:');
    mean = _.reduce(rangeCounters, function(acc,curr){ return acc+(curr/rangeCounters.length); },0);
    variance = _.chain(rangeCounters)
              .map(function(val){
                return Math.pow((val-mean),2);
              })
              .reduce(function(acc,curr,idx,arr){
                return acc+(curr/arr.length);
              },0)
              .value();

    console.log('\t',variance);
  }

})();
