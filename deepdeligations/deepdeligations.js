"use strict";
log('running deepdeligations.js');

var Ping = {
    options: {
        name: 'name not set',
    },
    ping: function () {
        log('ping from ' + this.options.name);
    },
};

var PingPong = Object.create(Ping);
PingPong.pong = function () {
  log('pong from ' + this.options.name);
};

PingPong.pingpong = function () {
    this.ping();
    this.pong();
};

var pingPong = Object.create(PingPong);
pingPong.options.name = "PingPong1";
pingPong.ping();
pingPong.pong();
try {
    pingPong.ing.ping();
} catch (e) {
    log(e);
}
log(typeof pingPong.ping);
pingPong.pingpong();
