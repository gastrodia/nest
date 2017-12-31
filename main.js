var server = require('./server');
var ip = require('ip');
console.log(ip.address())
server({
    startLocalPort:10000,
    localIp:ip.address(),
    port:3000
})