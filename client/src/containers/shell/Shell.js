import React, { Component } from 'react'
import { getURLObj, getSocketInstance } from '../../util';

import Terminal from 'xterm/dist/xterm';
import ReactDOM from 'react-dom'

import { fit } from 'xterm/dist/addons/fit/fit';
import { attach, detach } from 'xterm/dist/addons/attach/attach';
import 'xterm/dist/xterm.css'
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';


import './shell.less'
import _ from 'lodash'
import { connect } from 'react-redux';
@connect(
    state => {
        var birds = state.birds;
        var pid = parseInt(getURLObj().query.pid)
        var bird = _.find(birds, { localPort: pid });

        return {
            host: bird && bird.host
        }
    },
    // dispatch => bindActionCreators(actions, dispatch)
)
export default class Shell extends React.Component {


    componentDidMount() {
        console.log(Terminal.prototype)
        var term = new Terminal();  // Instantiate the terminal
        // xterm.fit();                 // Use the `fit` method, provided by the `fit` addon
        term.open(ReactDOM.findDOMNode(this));
        fit(term)
        var url = getURLObj();
        var socket = new WebSocket(`${url.query.server}/terminals/${url.query.pid}`)
        attach(term, socket)
        term._initialized = true;

    }


    render() {


        return <div id="terminal-container">
            <div className="host">
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={`/?server=${getURLObj().query.server}`}>机器列表</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{this.props.host}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </div>

    }
}





