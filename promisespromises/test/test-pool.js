
var vAsync = require("../async-pool.js");
var assert = require('chai').assert;

describe("async pool", function () {
  this.timeout(25000);

  /*
  it("will start", function (done) {
    var async = new vAsync(2, function () {
      done();
    });
    async.enqueue(0);
  });
  */

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
        if (timesCalled == 7) {
          done();
        }
      }, timeout);
    });
    async.pEnqueue([1, 2, 3, 4, 5, 6]);
    setTimeout(function () {
      async.pEnqueue(7);
    }, 10000);
  });
});
