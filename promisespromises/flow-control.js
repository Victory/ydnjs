// change to the path of your Promise library of choice
var Promise = require('../../MyPromise/vPromise.js');

// the queue of things todo
var todo = [1, 2, 3, undefined, 4, 5, 6];

/**
 * Example of a "useful" async function
 * @param p - promise we are chaining on
 * @param y - the next object in the queue
 */
var doSomethingUseful = function (p, y) {
  // a random timeout to show that methods still run in order
  var timeout = Math.random() * 1000;

  setTimeout(function () {
    // your useful action
    console.log('in useful', y);

    // called because you are ready to continue the chain
    p.then(handleNext.bind(p));
  }, timeout);
};

/**
 * Handles the next element on the queue
 * @param q - the queue
 */
var handleNext = function (q) {
  // get the next thing to do off the queue
  var y = q.shift();

  // if queue is empty ...
  if (typeof y == "undefined" && q.length === 0) {
    console.log('chain has ended'); // maybe you want to call render() here or something like that to say you are done
    return; // ... we have nothing todo
  }

  console.log('in handleNext', y);
  doSomethingUseful(this, y);
};

// create the chain
var p1 = Promise.resolve(todo);

// start the chain, binding to the chain
p1.then(handleNext.bind(p1));

console.log('chain has started');

/**
 output:

 chain has started
 in handleNext 1
 in useful 1
 in handleNext 2
 in useful 2
 in handleNext 3
 in useful 3
 in handleNext undefined
 in useful undefined
 in handleNext 4
 in useful 4
 in handleNext 5
 in useful 5
 in handleNext 6
 in useful 6
 chain has ended

**/