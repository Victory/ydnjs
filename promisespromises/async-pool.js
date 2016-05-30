/** example of having a pool of async tasks */

// include your promise library of choice
var Promise = require('../../MyPromise/vPromise.js');
var vAsync = function (numAsync, doer) {
  'use strict';
  var curIndex = 0;
  // coordinates launch of more tasks from the pool
  var p1 = Promise.resolve(queue);
  var pool = [];
  var queue = [];

  for (var ii = 0; ii < numAsync; ii++) {
    pool[ii] = {
      prms: Promise.resolve(undefined),
      isDone: true,
      index: ii
    };
  }

  var done = function (result) {
    // save the asyn item in the pool
    var p = this;

    console.log(p.index, 'is done');
    // set it to done
    p.isDone = true;

    // we are done this async task running we can now do the next thing
    p1.then(handleNext.bind(p1));
  };

  /**
   * Handles the next element on the queue
   */
  var handleNext = function () {
    for (var ii = 0; ii < numAsync; ii++) {
      if (!pool[ii].isDone)  {
        console.log(pool[ii].index, 'is not done', queue);
        continue;
      }

      var y = queue.shift();

      // if queue is empty ...
      if (typeof y === "undefined" && queue.length === 0) {
        return; // ... there is nothing to be done
      }

      pool[ii].isDone = false;
      console.log(pool[ii].index, 'is handling', y);
      doer(y, done.bind(pool[ii]));
    }
  };

  var pEnqueue = function (next) {
    if (Array.isArray(next)) {
      for (var ii = 0; ii < next.length; ii++) {
        queue.push(next[ii]);
      }
    } else {
      queue.push(next);
    }

    p1.then(handleNext.bind(p1));
  };

  return {
    pEnqueue: pEnqueue
  };
};

if (typeof module != 'undefined') {
  module.exports = vAsync;
}
