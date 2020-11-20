import React, { Component } from 'react'
import { Button, Layout } from 'antd'
import Navigation from '../components/Navigation'
import { Table, Tag, Space } from 'antd';

import {CloudUploadOutlined} from '@ant-design/icons';

const { Content } = Layout

export class DashBoard extends Component {


    render() {
        const columns = [
            {
                title: '文件名',
                dataIndex: 'filename',
                key: 'filename',
                render: text => <a>{text}</a>,
            },
            {
                title: '大小',
                dataIndex: 'size',
                key: 'size',
            },
            {
                title: '修改日期',
                dataIndex: 'modifyDate',
                key: 'modifyDate',
            },
            {
                title: '操作',
                key: 'action',
                render: (text) => (
                    <Space size="middle">
                        <Tag color="red" className="dashtag">删除</Tag>
                        <Tag color="green" className="dashtag">下载</Tag>
                    </Space>
                ),
            },
        ];

        const data = [
            {
                key: '1',
                filename: '学习资料1',
                size: 32,
                modifyDate: '2020-11-20',
            },
            {
                key: '2',
                filename: '学习资料2',
                size: 42,
                modifyDate: '2020-11-20',
            },
            {
                key: '3',
                filename: '学习资料3',
                size: 32,
                modifyDate: '2020-11-20',
            },
        ];
        return (
            <Layout>
                <Navigation />
                <Layout>
                    
                    <Content className="text-center dash-content">
                        <Button type="primary" className="upload-btn" icon={<CloudUploadOutlined />}>上传</Button>
                        <Table columns={columns} dataSource={data} />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default DashBoard
