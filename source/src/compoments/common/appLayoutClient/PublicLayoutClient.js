import React, { Component } from 'react';
import { Layout } from 'antd';
import logoUrl from '../../../assets/images/icons/logoEdutech.png';
const { Header ,Content } = Layout;

class PublicLayoutClient extends Component {
    render() {
        return (
            <Layout className="public-layout-client">
                <Header className="app-header">
                    <div className="container">
                        <div className="app-logo" >
                            <img src={logoUrl} alt="Vsolu"/>
                        </div>
                    </div>
                </Header>
                <Content className="app-content">
                    <div className="container">
                        {this.props.children}
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default PublicLayoutClient;
