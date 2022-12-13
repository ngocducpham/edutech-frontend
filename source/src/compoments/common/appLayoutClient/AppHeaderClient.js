import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd';
import {
    DownOutlined,
    UserOutlined,
    LoginOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BookOutlined,
    RollbackOutlined,
    BellOutlined 
} from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import { AppConstants, LayoutConfigs } from '../../../constants';
const {  Header } = Layout;
const SubMenu = Menu.SubMenu;

class AppHeaderClient extends Component {

    render() {
        const { onLogout , userData, onBackHome, currentPathname,  t } = this.props;
        console.log("userData", userData)
        return (
            <Header className="app-header"
                style={{
                    position: 'fixed',
                    zIndex: 1,
                    width: '280px',
                    minWidth: '280px',
                    right: 0,
                    marginRight: '10px',
                }}
            >   
                {/* {
                    currentPathname === '/classListClient' ? 
                    <span>  
                    </span> :
                     <span className="back" onClick={onBackHome}>
                     <RollbackOutlined/> <span style={{fontSize: '16px'}}>Quay về trang chủ</span>
                     </span> 
                } */}
                <div className='notify'>
                    <BellOutlined className='icon' />
                </div>
                <div className='gap'>
               
                               
                </div>
                <div className='board'>
                    <div className='avatar'>
                    <Avatar icon={<UserOutlined/>} src={userData.avatar ? `${AppConstants.contentRootUrl}${userData.avatar}` : null}/>
                    </div>
                    <div className='name'>
                    {userData.fullName || ''}
                    </div>
                        <Menu
                        mode="horizontal"
                        className="menu-top-right"
                    >
                        <SubMenu
                            title={
                                <span className="submenu-title-wrapper">
                                    <DownOutlined/>
                                </span>}
                            className="overlay-panel-submenu"
                            >
                            <Menu.Item key="/profile">  
                                <Link to="/profile">
                                    <UserOutlined/>
                                    <span>{t('profile')}</span>
                                </Link>
                            </Menu.Item>
                            {
                                userData.kind && userData.kind === 2? 
                                <Menu.Item key="/my-subject">
                                <Link to="/my-subject">
                                    <BookOutlined />
                                    <span>{t('teacherMySubject')}</span>
                                </Link>
                                </Menu.Item> : []
                            }
                            <Menu.Item onClick={onLogout}>
                                <LoginOutlined/>
                                <span>{t('logout')}</span>
                            </Menu.Item>
                        </SubMenu>
                        </Menu>
                </div>
            </Header>
        )
    }
}

export default withTranslation('appHeader')(AppHeaderClient);
