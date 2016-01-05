"use strict";
log('running protected.js');
function Ping(name) {
    var numPings = 0;
    var myName = name;
    var Ping = {
        ping: function () {
            numPings += 1;
            log('ping num ' + numPings + " for " + myName);
        },
        init: function (n) {
            myName = n;
        },
    };

    Ping.init(name);
    return Ping;
};

function Pong(name) {
    var numPongs = 0;
    var myName = name;

    var Pong = {
        pong: function () {
            numPongs += 1;
            log('pong num ' + numPongs + " for " + myName);
        },
        init: function (n) {
            myName = n;
        },
    };
    Pong.init(name);

    return Pong;
}

function PingPong (name) {
    var ing = new Ping(name); 
    var ong = new Pong(name);
    this.ping = ing.ping;
    this.pong = ong.pong;
    this.pingpong = function () {
        this.ping();
        this.pong();
    }
    return this;
}

var pingPong = new PingPong('PingPong1');
pingPong.ping();
pingPong.pong();
try {
    pingPong.ing.ping();
} catch (e) {
    log(e);
}
log(typeof pingPong.ping);
pingPong.pingpong();
