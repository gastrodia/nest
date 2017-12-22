import React, { Component } from 'react'

import { Router, Switch ,Route} from 'react-router';

import Home from './home';
import Article from './article';
import Error404 from './errors/404';
import Credit from './credit';
import Blog from './blog';
import Header from '../components/header';




// track pages on route change

export default function (props){
	return (<div id="app">
		<Header />
		<main id="content">
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/blog" component={Blog}/>
				<Route exact path="/blog/:title" component={Article}/>
				<Route exact path="/credit" component={Credit}/>
				<Route  default component={Error404}/>
			</Switch>
		</main>
	</div>)
}

