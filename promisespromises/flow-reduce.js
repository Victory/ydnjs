/** example of doing async reduce */

var Promise = require('../../MyPromise/vPromise.js');

var vAsync = function (initValue, doer) {
  var curValue = initValue;

  var WhenAllDone = function () {
    var toDo;

    return {
      allDone: function (whatToDo) {
        this.toDo = whatToDo;
      },
      force: function () {
        if (typeof this.toDo === "undefined") {
          return;
        }
        this.toDo.call(undefined, curValue);
      }
    };
  };

  var whenAllDone = new WhenAllDone();

  var allDone = function () {
    whenAllDone.force();
  };

  var done = function (result) {
    curValue = result;
    var p = this;
    p.then(handleNext.bind(p));
  };

  /**
   * Handles the next element on the queue
   * @param q - the queue
   */
  var handleNext = function (q) {
    // get the next thing to do off the queue
    var y = q.shift();

    // if queue is empty ...
    if (q.length === 0 && typeof y === "undefined" ) {
      allDone();
      return; // ... we have nothing todo
    }

    doer(curValue, y, done.bind(this));
  };


  var reduce = function (q) {
    // copy the queue so we don't mutate what was passed in
    var qcopy = q;

    // create the chain
    var p1 = Promise.resolve(qcopy);

    // start the chain, binding to the chain
    p1.then(handleNext.bind(p1));

    return whenAllDone;
  };

  return {
    reduce: reduce
  };
};
/** an example "useful maping funtion, that adds 10 to each value async */
/*
var myDoer = function (x, y, done) {
  // a random timeout to show that methods still run in order
  var timeout = Math.random() * 1000;

  setTimeout(function () {
    var newValue = x + y;
    // your useful action
    console.log('in useful', x, y);
    // called because you are ready to continue the chain
    done(newValue);
  }, timeout);
};

var whenAllDone = function (reduced) {
  console.log("i'm all done!", reduced);
};

var async = new vAsync(0, myDoer);
async.reduce([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).allDone(whenAllDone);
*/

if (typeof module != 'undefined') {
  module.exports = vAsync;
}
