/** example of having a pool of async tasks */

// include your promise library of choice
var Promise = require('../../MyPromise/vPromise.js');
var vAsync = function (numAsync, doer) {
  'use strict';
  var curIndex = 0;
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
    var p = this;
    //console.log('onDone: index', p.index, 'result', result);
    console.log(p.index, 'is done');
    // we are done running we can now do the next thing
    p.isDone = true;
    p.prms.then(handleNext.bind(p));
  };

  /**
   * Handles the next element on the queue
   */
  var handleNext = function () {
    var y = queue.shift();

    // if queue is empty ...
    if (typeof y === "undefined" && queue.length === 0) {
      return; // ... there is nothing to be done
    }
    console.log(this.index, 'is handling', y);

    doer(y, done.bind(this));
  };

  var pEnqueue = function (next) {
    if (Array.isArray(next)) {
      for (var ii = 0; ii < next.length; ii++) {
        queue.push(next[ii]);
      }
    } else {
      queue.push(next);
    }

    for (var ii = 0; ii < numAsync; ii++) {
      var cur = pool[ii];
      if (!cur.isDone) {
        continue;
      }
      cur.isDone = false;
      pool[ii].prms.then(handleNext.bind(pool[ii]));;
    }
  };

  return {
    pEnqueue: pEnqueue
  };
};

if (typeof module != 'undefined') {
  module.exports = vAsync;
}
