import React, { Component } from 'react'

import { Router, Switch, Route } from 'react-router';

import Article from './article';
import Error404 from './errors/404';
import Credit from './credit';
import Blog from './blog';
import Header from '../components/header';
import Shell from './shell/Shell';
import Birds from './birds/Birds'

import store from '../store'
import history from '../history';
import { ConnectedRouter, push } from 'react-router-redux';

import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../actions'



// track pages on route change

export default function (props) {



	return (<div id="app">
		<Header />
		<main id="content">
		
				<Switch>
					<Route exact path="/" component={Birds} />
					<Route exact path="/shell" component={Shell} />
					<Route default component={Error404} />
				</Switch>
	


		</main>
	</div>)
}

