import React, { Component } from 'react';
import { Layout, Menu, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { navMenuConfig, teacherNavMenuConfig, studentNavMenuConfig, customNavMenuConfig } from '../../../constants/menuConfig';
import logoUrl from '../../../assets/images/logo193.png';
import { AppConstants, UserTypes } from '../../../constants'
import { withTranslation } from 'react-i18next';
import { sitePathConfig } from '../../../constants/sitePathConfig';
import { stringify } from 'query-string';

import {
    RollbackOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

const findNavMenuActive = (navMenu, pathname) => {

    const menuActive = Object.keys(navMenu).find(navMenuKey => {
        if(navMenu[navMenuKey].path === pathname)
            return true;
        else if(navMenu[navMenuKey].childrenKeys) {
            return true;
        }
        return false;
    });
    return menuActive;
} 

const findNavMenuItemActive = (navMenu, pathname) => {
    let menuList = [];
    Object.keys(navMenu).forEach(menuKey => {
        const menuItem = navMenu[menuKey];
        menuList.push(menuItem);
    });

    const activeMenu = menuList.find(menuItem => {
        if(menuItem.childrenKeys && menuItem.childrenKeys.some(menuChildPath => pathname === menuChildPath))
            return true;
        return pathname === menuItem.path;
    });
    if(activeMenu) {
        return activeMenu.path;
    }
    return pathname;
}


class NavSiderClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadingMenuItem: null,
        }
    }

    handleLoadingMenuItem = (menuPath) => {
        this.setState({loadingMenuItem: menuPath})
        return true;
    }

    render() {
        const {currentPathname, onBackHome, userData, t } = this.props;
        const {
            loadingMenuItem,
        } = this.state;
        let menuConfig = []
        if(userData?.kind === UserTypes.ADMIN){
            menuConfig = navMenuConfig
        }
        if(userData?.kind === UserTypes.TEACHER){
            menuConfig= customNavMenuConfig
        }
        if(userData?.kind === UserTypes.STUDENT){
            menuConfig= customNavMenuConfig
        }
        const availableMenu = menuConfig;
        /*
        const availableMenu = menuConfig.filter(navMenu => {
            if(navMenu.handleOnClick) {
                return userData.permissions?.indexOf(navMenu.permissions[0]) > -1;
            }
            else if(navMenu.permissions) {
                return userData.permissions?.indexOf(navMenu.permissions[0]) > -1;
            }
            return true;
        });
         */
        const menuActive = findNavMenuActive(availableMenu, currentPathname);
        const menuItemActive = findNavMenuItemActive(availableMenu, currentPathname);

        return (
            
            <Sider
                className={'nav-sider nav-sider__expanded'}
                >
                <div className='frame'>
                    <div>
                        <div className={'logo logo__expanded'} style={{ width: '100%' }}>
                            <img src={userData.logo ? `${AppConstants.contentRootUrl}${userData.logo}` : logoUrl} alt="Mira"/>
                        </div>
                        <Menu
                            theme="dark"
                            mode="inline"
                            selectedKeys={[menuItemActive]}
                            className="custom-nav"
                            defaultOpenKeys={[menuActive]}
                        >
                            {availableMenu.map((navMenuItem, idx) =>
                                <Menu.Item
                                    className="custom-nav-item"
                                    key={navMenuItem.path}
                                    style={{ paddingLeft: '0 34px 0 10px' }}
                                    >
                                    <Link to={navMenuItem.path}>
                                        <span className='icon'>
                                            {
                                                navMenuItem.icon
                                            }
                                            
                                            <span className='label'>{t(navMenuItem.label)}</span>
                                        </span>
                                    </Link>
                                </Menu.Item>
                            )} 
                        
                        </Menu>
                    </div>
                    <div className='rollback' onClick={onBackHome}>
                    <ArrowLeftOutlined className='icon'  /><span >Rời khỏi lớp học</span>
                    </div>  
                </div>
               
            </Sider>
        )
    }
}

export default withTranslation('navSider')(NavSiderClass);
