
import { Image, Layout, } from 'antd'
import Title from 'antd/lib/typography/Title'
import NetDiskPic from '../assets/netdisk.png'
import React, { Component } from 'react'

const {Header} = Layout

export class Navigation extends Component {
    static propTypes = {

    }

    render() {
        return (
            <Header className="nav-header shadow-1-down">
                <Image src={NetDiskPic} width="50px" style={{float: 'left'}} />
                <Title level={3} className="nav-title">Hadoop云盘</Title>
            </Header>
        )
    }
}

export default Navigation
