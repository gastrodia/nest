import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default function () {
	return (
		<header className="header">
			<h1>Preact Starter</h1>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/blog">Blog</Link>
				<Link to="/credit">Credit</Link>
			</nav>
		</header>
	)
}
