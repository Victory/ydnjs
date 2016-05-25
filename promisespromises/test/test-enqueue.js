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

  it("Will add to end", function (done) {
    var timesCalled = 0;
    var delay = 50;
    var whenToCallDone = delay * timesCalled + 1;

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
});

