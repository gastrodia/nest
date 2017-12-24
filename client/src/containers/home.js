import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Card from '../components/card';



import { Table, Button } from 'antd';
import 'antd/dist/antd.less'
import { getSocketInstance, getURLObj,request, getSocketByURL	 } from '../util';

const columns = [{
	title: 'host',
	dataIndex: 'host',
	render: (text,record) => <Link to={`/shell?server=${getURLObj().query.server}&pid=${record.localPort}`}>{text}</Link>
}, {
	title: 'localPort',
	dataIndex: 'localPort',
}, {
	title: '连接时间',
	dataIndex: 'linkTime',
},];



export default class App extends React.Component {
	state = {
		selectedRowKeys: [], // Check here to configure the default column
		loading: false,
	};
	start = () => {
		this.setState({ loading: true });
		// ajax request after empty completing
		setTimeout(() => {
			this.setState({
				selectedRowKeys: [],
				loading: false,
			});
		}, 1000);
	}
	onSelectChange = (selectedRowKeys) => {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		this.setState({ selectedRowKeys });
	}


	componentDidMount() {
		var url = getURLObj();
		var socket = new WebSocket(url.query.server + '/birds');
		socket.onopen = ()=>{
			socket.addEventListener("message",(e)=>{
				var data = JSON.parse(e.data || {})
				this.setState({data:data})
			})	
		}
		// var socket = getSocketByURL(url.query.server + '/birds');
		// socket.on("message",(data)=>{
		// 	debugger
		// })
	}
	render() {
		const { loading, selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};
		const hasSelected = selectedRowKeys.length > 0;
		return (
			<div>
				<div style={{ marginBottom: 16 }}>
					<Button
						type="primary"
						onClick={this.start}
						disabled={!hasSelected}
						loading={loading}
					>
						Run Script
         			</Button>
					<span style={{ marginLeft: 8 }}>
						{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
					</span>
				</div>
				<Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
			</div>
		);
	}
}


