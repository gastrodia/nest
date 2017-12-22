import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Card from '../components/card';

import io from 'socket.io-client';	
const socket = io('http://localhost:3001');

import { Table, Button } from 'antd';
import 'antd/dist/antd.less'
const columns = [{
	title: 'host',
	dataIndex: 'host',
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
		socket.on('data',(data)=>{
			this.setState({ data: data })
		})

		socket.on('newTarget',(target)=>{
			this.setState({data:this.state.data.concat(target)})
		})
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
						Reload
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


