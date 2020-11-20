import React, { Component } from 'react'
import Navigation from '../components/Navigation'
import { Layout } from 'antd'
import LoginForm from '../components/LoginForm'

const {Content} = Layout

export class Login extends Component {
    render() {
        return (
            <div>
                <Layout>
                <Navigation />
                <Layout>
                    <Content>
                        <LoginForm />
                    </Content>
                </Layout>
            </Layout>
            </div>
        )
    }
}

export default Login
