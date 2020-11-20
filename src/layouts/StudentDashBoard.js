import React, { Component } from 'react'
import { Layout } from 'antd'
import Navigation from '../components/Navigation'
import { Table, Tag, Space } from 'antd';

import { HDFSApi } from '../api/HDFSApi';
import { Link } from 'react-router-dom';

const { Content } = Layout

export class StudentDashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: []
        }
    }
    componentDidMount() {
        HDFSApi.list().then((res) => {
            this.setState({ tableData: res })
        })
    }
    render() {
        const columns = [
            {
                title: '文件名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '大小',
                dataIndex: 'size',
                key: 'size',
            },
            {
                title: '修改日期',
                dataIndex: 'lastModificationTime',
                key: 'lastModificationTime',
            },
            {
                title: '操作',
                key: 'path',
                render: (file) => (
                    <Space size="middle">
                        <Tag color="green" className="dashtag" onClick={() => {
                            let path = 'http://localhost:8080/hadoopnetdisk/hadoop/download?path=' + HDFSApi.urlTransformer(file.path)
                            window.location.href = path
                        }}>下载</Tag>
                    </Space>
                ),
            },
        ];

        const data = this.state.tableData
        return (
            <Layout>
                <Navigation />
                <Layout>
                    <Content className="text-center dash-content">
                        <Table columns={columns} dataSource={data} />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default StudentDashBoard
