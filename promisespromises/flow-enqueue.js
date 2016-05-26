/** example doing async enqueue */

// include your promise library of choice
var Promise = require('../../MyPromise/vPromise.js');

var vAsync = function (doer) {
  'use strict';
  var curIndex = 0;
  var queue = [];
  var p1 = Promise.resolve(queue);

  var done = function (result) {
    var p = this;
    p.then(handleNext.bind(p));
  };

  /**
   * Handles the next element on the queue
   * @param q - the queue
   */
  var handleNext = function () {
    var y = queue.pop();

    // if queue is empty ...
    if (typeof y === "undefined" && queue.length === 0) {
      return; // ... there is nothing to be done
    }

    doer(y, done.bind(this));
  };


  var enqueue = function (next) {
    queue.push(next);

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