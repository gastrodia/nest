
if (typeof window === 'undefined') {
  global.window = {}
}
var webpackIsomorphic = require('webpack-isomorphic');

// The base directory of your built files
webpackIsomorphic.install(__dirname + '/dist', {
	cache: process.env['NODE_ENV'] !== 'development'
});

var server = require('./dist/server')

var path = require('path')
var Express = require('express')

const app = Express()
const port = 4000

//Serve static files
app.use('/static', Express.static('dist'))

// This is fired every time the server side receives a request
app.use(handleRender)

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
    var render = server.App.default;
    render(req,res);
}

app.listen(port)