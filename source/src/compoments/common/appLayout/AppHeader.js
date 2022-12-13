import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd';
import {
    DownOutlined,
    UserOutlined,
    LoginOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BookOutlined
} from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import { AppConstants, LayoutConfigs } from '../../../constants';
const {  Header } = Layout;
const SubMenu = Menu.SubMenu;

class AppHeader extends Component {

    render() {
        const { onLogout , userData, onToggleNavSide, navSidercollapsed, t, pathname } = this.props;
        console.log("userData", userData)
        return (
            <Header className="app-header"
                style={{
                    position: 'fixed',
                    zIndex: 1,
                    width: `calc(100% - ${navSidercollapsed ? LayoutConfigs.NAV_WIDTH_COLLAPSED : LayoutConfigs.NAV_WIDTH_EXPANDED}px)`
                }}
            >
                {
                    userData.kind === 1 ? 
                    <span className="icon-collapsed" onClick={onToggleNavSide}>
                    {
                        navSidercollapsed
                        ?
                        <MenuUnfoldOutlined/>
                        :
                        <MenuFoldOutlined/>
                    }
                    </span> : 
                    pathname === '/classListClient' || pathname === '/allClassNews' || pathname === '/profile' || pathname === '/my-subject' || pathname === '/forbidden' ? 
                    <span className='class-name'>
                        Edutech
                    </span> :
                    <span className='class-name'>
                        {
                            localStorage.getItem("className")
                        }
                    </span>
                }
              
                <Menu
                    mode="horizontal"
                    className="menu-top-right"
                >
                    <SubMenu
                        title={
                            <span className="submenu-title-wrapper">
                                <Avatar icon={<UserOutlined/>} src={userData.avatar ? `${AppConstants.contentRootUrl}${userData.avatar}` : null}/>
                                {userData.fullName || ''}
                                <DownOutlined/>
                            </span>}
                        className="overlay-panel-submenu"
                        >
                        <Menu.Item key="/profile">
                            <Link to="/profile" onClick={() => {window.localStorage.setItem("className", "Edutech")}}>
                                <UserOutlined/>
                                <span>{t('profile')}</span>
                            </Link>
                        </Menu.Item>
                        {
                            userData.kind && userData.kind === 2? 
                            <Menu.Item key="/my-subject">
                            <Link to="/my-subject" onClick={() => {window.localStorage.setItem("className", "Edutech")}}>
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
            </Header>
        )
    }
}

export default withTranslation('appHeader')(AppHeader);
