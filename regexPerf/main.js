;(function(){

  var gen = require('./../generator.js');
  var _ = require('lodash');

  var NUM_TESTS = +process.argv[2];
  var STRING_PRIMITIVE = '';

  /* ~ TEST RESOURCES ~ */

  //regexp
  var floatRegExp = /(\+|\-){0,1}[0-9]+([.]{1}[0-9]+)?([e]{1}(\+|\-){0,1}[0-9]+)?/;

  //iterative
  var acceptedDigits = '0123456789'.split('');
  var dot = '.';
  var e = 'e';
  var plus = '+';
  var minus = '-';
  var dotFlag, eFlag, failFlag, firstCharAfterDotFlag, firstCharAfterEFlag, firstCharWasPlusMinus, firstCharAfterEWasPlusMinus;
  var failIdx;
  var start, avgIterativeTime, avgRegexTime;

  /* ~ END TEST RESOURCES ~ */

  main();

  function main(){
    var floatStrings;

    if(isNaN(NUM_TESTS)){
      console.log('Invalid number passed as argument.');
    }

    floatStrings = getRandomFloatStrings(NUM_TESTS);
    avgIterativeTime = 0;
    _.forEach(floatStrings, function(val){
      start = _.now();
      parseFloatIterative(val);
      avgIterativeTime += (_.now()-start)/NUM_TESTS;
    });

    floatStrings = getRandomFloatStrings(NUM_TESTS);
    avgRegexTime = 0;
    _.forEach(floatStrings, function(val){
      start = _.now();
      parseFloatRegex(val);
      avgRegexTime += (_.now()-start)/NUM_TESTS;
    });

    console.log();
    console.log('Average iterative time: ', avgIterativeTime);
    console.log('Average RegExp time: ', avgRegexTime);
    console.log();

  }//1467 v 61

  function parseFloatIterative(floatStr){
    var i;
    dotFlag = eFlag = failFlag = firstCharWasPlusMinus =firstCharAfterEWasPlusMinus = firstCharAfterDotFlag = firstCharAfterEFlag =false;
    for(i=0; i<floatStr.length; ++i){
      if(i===0){
        if(floatStr[i]===plus||floatStr[i]===minus){
          firstCharWasPlusMinus = true;
        }else if(acceptedDigits.indexOf(floatStr[i])===-1){
          failFlag = true;
          break;
        }
      }else{
        if(dotFlag){
          if(firstCharAfterDotFlag){
            firstCharAfterDotFlag = false;
            if(acceptedDigits.indexOf(floatStr[i])===-1){
              failFlag = true;
              break;
            }
          }else{
            if(floatStr[i]===e){
              eFlag = true;
              firstCharAfterEFlag = true;
              dotFlag = false;
              continue;
            }else{
              if(acceptedDigits.indexOf(floatStr[i])===-1){
                failFlag = true;
                break;
              }
            }
          }
        }else if(eFlag){
          if(firstCharAfterEFlag){
            firstCharAfterEFlag = false;
            if(floatStr[i]===plus||floatStr[i]===minus){
              firstCharAfterEWasPlusMinus=true;
              continue;
            }else if(acceptedDigits.indexOf(floatStr[i])===-1){
              failFlag = true;
              break;
            }
          }else{
            if(firstCharAfterEWasPlusMinus){
              if(acceptedDigits.indexOf(floatStr[i])===-1){
                failFlag = true;
                break;
              }
              firstCharAfterEWasPlusMinus = false;
            }else if(acceptedDigits.indexOf(floatStr[i])===-1){
              failFlag = true;
              break;
            }
          }

        }else{

          if(floatStr[i]===dot){
            if((firstCharWasPlusMinus && i<2)||i<1){
              failFlag = true;
              break;
            }
            dotFlag = true;
            firstCharAfterDotFlag = true;
            continue;
          }else if(acceptedDigits.indexOf(floatStr[i]) === -1){
            failFlag = true;
            break;
          }
          firstCharWasPlusMinus = false;
        }
      }
    }
    if(firstCharAfterEFlag || firstCharAfterDotFlag || firstCharWasPlusMinus || firstCharAfterEWasPlusMinus){
      failFlag = true;
    }
    if(failFlag) failIdx = i;
    return !failFlag;
  }


  function parseFloatRegex(floatStr){
    return floatRegExp.exec(floatStr) !== null;
  }

  function getRandomFloatStrings(n){
    return _.map(gen.getRandomFloats(n), function(val){
      return STRING_PRIMITIVE+val;
    });
  }

})();
