var whatsHappening = document.getElementById('whats-happening');
var race1 = document.getElementById('race1');
var race2 = document.getElementById('race2');
var all = document.getElementById('all');

whatsHappening.textContent = 'loading';

var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 1000);
});

var p2 = p1.then(function () {
    setTimeout(function () {
        whatsHappening.textContent = 'i will happen to quick to see';
    }, 1000);
}, function () {
    whatsHappening.textContent = 'i wont happen';
});

p2.then(function () {
    setTimeout(function () {
        whatsHappening.textContent = "p2's turn!";
    }, 1000);
}, function () {
    whatsHappening.textContent = "won't happen from p2";
}); 

var pRace1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 1000, "race1");
});

var pRace2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 1001, "race2");
});

Promise.race([pRace1, pRace2]).then(function (value) {
    race1.textContent = value;
}, function (reason) {
    race2.textContent = reason;
});

Promise.all([pRace1, pRace2]).then(function (value) { 
    all.textContent = value;
});

var callReject = new Promise(function(resolve, reject) {
    reject(4);
}).then(function () {}, function (value) { console.log(value) });

var rejected = new Promise(function (resolve, reject) {
    throw "rejected";
}).then(function () {}, function (value) { console.log(value); });

