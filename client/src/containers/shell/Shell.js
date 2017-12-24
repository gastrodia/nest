import React, { Component } from 'react'
import { getURLObj, getSocketInstance } from '../../util';

import Terminal  from 'xterm/dist/xterm';
import ReactDOM from 'react-dom'

import {fit} from 'xterm/dist/addons/fit/fit';
import {attach,detach} from 'xterm/dist/addons/attach/attach';
import 'xterm/dist/xterm.css'

import './shell.less'

export default class Shell extends React.Component {


    componentDidMount() {
        console.log(Terminal.prototype)
        var term = new Terminal();  // Instantiate the terminal
       // xterm.fit();                 // Use the `fit` method, provided by the `fit` addon
        term.open(ReactDOM.findDOMNode(this));
        fit(term)
        var url = getURLObj();
        var socket = new WebSocket(`${url.query.server}/terminals/${url.query.pid}`)
        attach(term,socket)
        term._initialized = true;

    } 

    render() {
        return <div id="terminal-container">{getURLObj().query.host}</div>
    }
}





