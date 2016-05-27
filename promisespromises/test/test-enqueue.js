/**
 *
 * Created by user on 5/25/16.
 */


var vAsync = require("../flow-enqueue.js");
var assert = require('chai').assert;

describe("enqueue", function () {
  this.timeout(15000);
  it("Will start", function (done) {
    var async = new vAsync(function () {
      done();
    });
    async.enqueue(0);
  });

  it("Will start eventually", function (done) {
    var async = new vAsync(function () {
      setTimeout(done, 100);
    });
    async.enqueue(0);
  });

  it("Will call once for each item added", function (done) {
    var timesCalled = 0;
    var delay = 50;

    var async = new vAsync(function (y, imDone) {
      setTimeout(function () {
        timesCalled += 1;
        if (timesCalled === 5) {
          done();
        }
        imDone(timesCalled);
      }, delay);
    });

    async.enqueue(0);
    async.enqueue(1);
    async.enqueue(2);
    async.enqueue(3);
    setTimeout(function () {
      async.enqueue(4);
    }, 1000);
  });

  it("Will call in order", function (done) {
    var timesCalled = 0;
    var delay = 50;

    var async = new vAsync(function (y, imDone) {
      setTimeout(function () {
        assert.equal(y, timesCalled);

        timesCalled += 1;
        if (timesCalled === 5) {
          done();
        }
        imDone(timesCalled);
      }, delay);
    });

    for (var ii = 0; ii < 4; ii++) {
      (function (x) {
        async.enqueue(x);
      })(ii);
    }
    setTimeout(function () {
      async.enqueue(4);
    }, 1000);
  });

  it("Will call in order with random delay", function (done) {
    var timesCalled = 0;
    var trials = 100;
    var maxDelay = 10;
    var async = new vAsync(function (y, imDone) {
      var delay = Math.random() * maxDelay;
      setTimeout(function () {
        assert.equal(y, timesCalled);

        timesCalled += 1;
        if (timesCalled === trials) {
          done();
        }
        imDone(timesCalled);
      }, delay);
    });

    for (var ii = 0; ii < (trials - 1); ii++) {
      (function (x) {
        async.enqueue(x);
      })(ii);
    }

    setTimeout(function () {
      async.enqueue(trials - 1);
    }, (trials * maxDelay) + 1);
  });
});

