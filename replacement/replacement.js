"use strict";
log('running replacement.js');

var Ping = {
    ping: function () {
        log('ping: ' + this.name);
    },
}

var Pong = {
    pong: function () {
        log('pong');
    }
}

function PingPong () {
    var cls, method;
    for (var ii = 0; ii < arguments.length; ii++) {
        cls = arguments[ii];
        this[cls] = Object.create(window[cls]);
        for (method in window[cls]) { 
            this[method] = window[cls][method];
        } 
    }
    this.init = function (name) {
        this.name = name;
    };

    this.pingpong = function () {
        this.ping();
        this.pong();
    };
}


var pingPong = new PingPong('Ping', 'Pong'); 
pingPong.init('p1');
pingPong.ping();
pingPong.pong();
log(typeof pingPong.ping);
pingPong.pingpong();


var pingPong2 = new PingPong('Ping', 'Pong');
pingPong2.init('p2');
pingPong2.pingpong();
pingPong.pingpong();
