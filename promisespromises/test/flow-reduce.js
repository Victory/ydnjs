var vAsync = require("../flow-reduce.js");

var ten = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var noopConstTime = function (x, y, done) {
  var timeout = 10;
  setTimeout(function () {
    done();
  }, timeout);
};

var sumConstTime = function (x, y, done) {
  var timeout = 10;
  setTimeout(function () {
    var next = x + y;
    console.log(next);
    done(next);
  }, timeout);
};



describe("allDone", function () {
  this.timeout(2000);
  it("Will call when finished", function (done) {
    var async = new vAsync(0, noopConstTime);
    async.reduce(ten).allDone(function (x) {
      done();
    });
  });

  it("Will call with reduced value", function (done) {
    var async = new vAsync(0, sumConstTime);
    async.reduce(ten).allDone(function (x) {
      assert(x == 55);
      done();
    });
  });
});
