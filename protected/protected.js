"use strict";
log('running protected.js');

function Ping (name) {
    var numPings = 0;
    var myName = null;
    var P = {
        ping: function () {
            numPings += 1;
            log('ping num ' + numPings + " for " + myName);
        },
        init: function (n) {
            myName = n;
        },
    };

    P.init(name);

    return P;
}

var ping1 = new Ping('ping1');
var ping2 = new Ping('ping2');
ping1.ping();
ping1.ping();
ping2.ping();
ping2.ping();
try {
    ping1.P.init('foo');
} catch (e) {
    log(e);
}
ping1.ping();
