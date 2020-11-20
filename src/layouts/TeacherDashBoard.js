import React, { Component } from 'react'
import { Button, Layout, Upload } from 'antd'
import Navigation from '../components/Navigation'
import { Table, Tag, Space } from 'antd';
import { Popconfirm, message } from 'antd';


import {CloudUploadOutlined} from '@ant-design/icons';
import { HDFSApi } from '../api/HDFSApi';

const { Content } = Layout

export class TeacherDashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: []
        }
    }
    fetchData = () => {
        HDFSApi.list().then((res) => {
            this.setState({ tableData: res })
        })
    }
    componentDidMount() {
        this.fetchData()
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
                        <Popconfirm placement="top" title="确认删除嘛?" onConfirm={ () => {
                            HDFSApi.deleteFile(file.path).then((res) => {
                                if(res === '删除成功') {
                                    message.success(res)
                                    this.fetchData()
                                } else {
                                    message.error(res)
                                }
                            })
                        }} okText="Yes" cancelText="No">
                            <Tag color="red" className="dashtag">删除</Tag>
                        </Popconfirm>
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
                        <input id="upload-inputfile" name="file" type="file" 
                            style={{display: "none"}}
                            onChange={(e) => { 
                                HDFSApi.upload(e.target.files[0], e.target.value).then(res => {
                                    if(res === '上传成功') {
                                        message.success('上传成功')
                                        this.fetchData()
                                    } else {
                                        message.error('上传失败')
                                    }
                                })
                            }}/>
                        <Button type="primary" className="upload-btn" icon={<CloudUploadOutlined />} onClick={ () => {
                            document.getElementById('upload-inputfile').click()
                        }}>上传</Button>
                        <Table columns={columns} dataSource={data} />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default TeacherDashBoard
