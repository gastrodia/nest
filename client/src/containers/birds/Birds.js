import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import { Table, Button } from 'antd';
import 'antd/dist/antd.less'
import { getSocketInstance, getURLObj,request, getSocketByURL	 } from '../../util';
import { fetchBirds } from './actions';


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


fetchBirds();

import { connect } from 'react-redux';
@connect(
    state => state,
    // dispatch => bindActionCreators(actions, dispatch)
)
export default class Birds extends React.Component {
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

	render() {
		const { loading, selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};
		const hasSelected = selectedRowKeys.length > 0;
		const {birds} = this.props;
		return (
			<div  style={{ padding: 20 }}>
				<div  style={{ padding: 20 }}>
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
				<Table rowSelection={rowSelection} columns={columns} dataSource={birds} />
			</div>
		);
	}
}


