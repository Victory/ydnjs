
var p = new Promise(function (resolve) {
  resolve(1);
}).then(function (val) {
  console.log(val);
  return 2;
}).then(function (val) {
  console.log(val);
  return 3;
}).then(function (val) {
  console.log(val);
});
console.log(p);
