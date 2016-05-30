
var vAsync = require("../async-pool.js");
var assert = require('chai').assert;

describe("async pool", function () {
  this.timeout(25000);

  it("will start", function (done) {
    var async = new vAsync(2, function () {
      done();
    });
    async.pEnqueue(0);
  });

  it("will limit to 3", function (done) {
    var index = 0;
    var timesCalled = 0;
    var async = new vAsync(3, function (y, imDone) {
      var timeout = Math.random() * 2500;
      if (index >= 3) {
        timeout = 0;
      }
      setTimeout(function () {
        imDone(y);

        timesCalled += 1;
        if (timesCalled >= 8) {
          done();
        }
      }, timeout);
    });
    async.pEnqueue([1, 2, 3, 4, 5, 6]);
    setTimeout(function () {
      console.log('adding 8')
      async.pEnqueue(8);
    }, 10000);
    setTimeout(function () {
      console.log('adding 7')
      async.pEnqueue(7);
    }, 5000);
  });

  it("will handle adding slowly", function (done) {
    var index = 0;
    var timesCalled = 0;
    var async = new vAsync(3, function (y, imDone) {
      var timeout = Math.random() * 2500;
      if (index >= 3) {
        timeout = 0;
      }
      setTimeout(function () {
        imDone(y);

        timesCalled += 1;
        if (timesCalled >= 8) {
          done();
        }
      }, timeout);
    });

    var index = 0;
    var interval = setInterval(function () {
      index += 1;
      async.pEnqueue(index);
      if (index == 8) {
        clearInterval(interval);
      }
    }, 5);
  });

  it("will handle two rushes", function (done) {
    var index = 0;
    var timesCalled = 0;
    var async = new vAsync(3, function (y, imDone) {
      var timeout = 500;

      if (y == 1) {
        timeout += 7500;
      }
      setTimeout(function () {
        imDone(y);

        timesCalled += 1;
        if (timesCalled >= 7) {
          done();
        }
      }, timeout);
    });
    async.pEnqueue([1, 2, 3]);
    setTimeout(function () {
      console.log('pushing to queue');
      async.pEnqueue([4, 5, 6, 7]);
    }, 4000);
  });
});
