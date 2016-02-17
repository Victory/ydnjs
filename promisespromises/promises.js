var whatsHappening = document.getElementById('whats-happening');

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

