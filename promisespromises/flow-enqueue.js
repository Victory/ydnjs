/** example doing async enqueue */

// include your promise library of choice
var Promise = require('../../MyPromise/vPromise.js');

var vAsync = function (doer) {
  'use strict';
  var curIndex = 0;
  var queue = [];
  var p1 = Promise.resolve(queue);
  // true if we aren't running
  var isDone = true;

  var done = function (result) {
    var p = this;
    // we are done running we can now do the next thing
    p.then(handleNext.bind(p));
  };

  /**
   * Handles the next element on the queue
   */
  var handleNext = function () {
    isDone = true;
    var y = queue.shift();

    // if queue is empty ...
    if (typeof y === "undefined" && queue.length === 0) {
      return; // ... there is nothing to be done
    }

    doer(y, done.bind(this));
  };

  var enqueue = function (next) {
    queue.push(next);

    // we have another running process that will pull next off the queue
    if (!isDone) {
      return;
    }
    // state that we are running
    isDone = false;

    // start the chain, binding to the chain
    p1.then(handleNext.bind(p1));
  };

  return {
    enqueue: enqueue
  };
};

if (typeof module != 'undefined') {
  module.exports = vAsync;
}