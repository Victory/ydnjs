/**
 * wrap the flow control for async tasks to be done in sequence
 */

var Promise = require('../../MyPromise/vPromise.js');

var vAsync = function (doer) {

  var allResults = [];

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
        this.toDo.call(undefined, allResults);
      }
    };
  };

  var whenAllDone = new WhenAllDone();

  var allDone = function () {
    whenAllDone.force();
  };

  var done = function (result) {
    console.log('dones result', result);

    allResults.push(result);
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

    console.log('in handleNext', y);

    doer(y, done.bind(this));
  };


  var map = function (q) {
    // copy the queue so we don't mutate what was passed in
    var qcopy = q;

    // create the chain
    var p1 = Promise.resolve(qcopy);

    // start the chain, binding to the chain
    p1.then(handleNext.bind(p1));

    return whenAllDone;
  };

  return {
    map: map
  };
};
/** an example "useful maping funtion, that adds 10 to each value async */
var myDoer = function (y, done) {
   // a random timeout to show that methods still run in order
  var timeout = Math.random() * 1000;

  setTimeout(function () {
    // your useful action
    console.log('in useful', y);
    // called because you are ready to continue the chain
    done(y + 10);
  }, timeout);
};

var whenAllDone = function (allResults) {
  console.log("i'm all done!", allResults);
};

var async = new vAsync(myDoer);
async.map([1, 2, 3, 4, 5, 6]).allDone(whenAllDone);


if (typeof module != 'undefined') {
  module.exports = vAsync;
}
