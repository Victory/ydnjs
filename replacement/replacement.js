"use strict";
log('running replacement.js');

var Ping = {
    ping: function () {
        log('ping');
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
    this.pingpong = function () {
        this.ping();
        this.pong();
    }
}


var ping = Object.create(Ping);
ping.ping();
var pingPong = new PingPong('Ping', 'Pong'); 
pingPong.ping();
pingPong.pong();
log(typeof pingPong.ping);
pingPong.pingpong();
