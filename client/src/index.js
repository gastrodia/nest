import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import GAnalytics from 'ganalytics';
import './index.less';
import { BrowserRouter,Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const onChange = obj => window.ga && ga.send('pageview', { dp: obj.url });
let elem, App;
function init() {
	App = require('./containers').default;
	elem = ReactDOM.render(
		<Router onChange={onChange} history={history}>
			<App/>
	  	</Router>
		, document.getElementById('root'), elem);
}

init();

if (process.env.NODE_ENV === 'production') {
	// cache all assets if browser supports serviceworker
	if ('serviceWorker' in navigator && location.protocol === 'https:') {
		navigator.serviceWorker.register('/service-worker.js');
	}

	// add Google Analytics
	window.ga = new GAnalytics('UA-XXXXXXXX-X');
} else {
	// use preact's devtools
	//require('preact/devtools');
	// listen for HMR
	if (module.hot) {
		module.hot.accept('./containers', init);
	}
}
