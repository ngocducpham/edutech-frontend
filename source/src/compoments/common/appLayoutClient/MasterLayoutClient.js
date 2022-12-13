import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Breadcrumb, Spin } from 'antd';

import NavSiderClient from './NavSiderClient';
import NavSiderClass from './NavSiderClass';
import AppHeaderClient from './AppHeaderClient';
import { LayoutConfigs, StorageKeys } from '../../../constants';
import { actions } from '../../../actions';
import { sitePathConfig } from '../../../constants/sitePathConfig';
import Utils from '../../../utils';
import { withTranslation } from 'react-i18next';

import AppHeader from '../appLayout/AppHeader';
import NavSider from '../appLayout/NavSider';
import SideBarClass from './client/class/SideBarClass';
import SidebarLessonPage from './client/lesson/SidebarLessonPage';

const { getUserData } = actions;

const { Content, Footer } = Layout;

class MasterLayoutClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: getUserData(),
            breadcrumbs: [],
            navSidercollapsed: false,
        }
        this.onLogout = this.onLogout.bind(this);
        this.onChangeBreadcrumb = this.onChangeBreadcrumb.bind(this);
        this.userData = getUserData();
    }

    onToggleNavSide() {
        this.setState({
            navSidercollapsed: !this.state.navSidercollapsed,
        });
      };


    componentWillMount() {
        const { location: { pathname }, history } = this.props;
        if(!this.state.userData) {
            history.push(sitePathConfig.login.path);
        }
        else {
            this.checkPermission(pathname);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { location: { pathname } } = nextProps;
        const { userData } = this.state;
        if(this.props.location.pathname !== pathname) {
            if(!Utils.isEmptyObject(userData))
                this.checkPermission(pathname);
        }
        
    }

    checkPermission(pathname){
        if(pathname === '/booking' && this.props.location.state && this.props.location.state.isRedirectToHomePage){
            this.redirectToAuthPage();
        }
        else{
            Object.keys(sitePathConfig).forEach(key => {
                if(sitePathConfig[key].path === pathname || pathname.startsWith(sitePathConfig[key].path + '/')) {
                    if(sitePathConfig[key].permissions && this.userData.permissions.indexOf(sitePathConfig[key].permissions[0]) < 0) {
                        //this.props.history.push(sitePathConfig.forbidden.path);
                    }
                }
            });
        }
    }

    redirectToAuthPage(){
        if(!Object.keys(sitePathConfig).find(key => {
          if(sitePathConfig[key].permissions && this.userData.permissions.indexOf(sitePathConfig[key].permissions[0]) > -1) {
            this.props.history.push(sitePathConfig[key].path);
            return true;
          }
          return false;
        }))
          this.props.history.push(sitePathConfig.profile.path);
      }

    onChangeBreadcrumb(breadcrumbs) {
        this.setState({ breadcrumbs });
    }

    onChangeUserData = (newUserData) => {
        const userData = {
            ...this.userData,
            fullName: newUserData.fullName,
            avatar: newUserData.avatar,
            logo: newUserData.logo

        }
        this.props.setUserData(userData);
        this.setState({userData});
    }

    onLogout() {
        const { logout } = this.props; 
        logout();
        if(window.localStorage && window.localStorage.getItem(StorageKeys.userData))
            window.localStorage.removeItem(StorageKeys.userData);
        window.location.href = sitePathConfig.login.path;
    }

    onBackHome() {
        window.location.href = sitePathConfig.classListClient.path;
        window.localStorage.setItem("className", "Edutech")
    }

    render() {
        const {
            children,
            location: { pathname },
            fullScreenLoading,
            showFullScreenLoading,
            hideFullScreenLoading,
            siteConfig,
            t,
        } = this.props;
        const { breadcrumbs, userData, navSidercollapsed } = this.state;
        const contentClass = siteConfig?.contentClass || '';
        if(!userData)
            return null;
        
        return (
            <Spin size="large" wrapperClassName="full-screen-loading" spinning={fullScreenLoading}>
                <Layout className="master-layout-client">
                    {
                        pathname === '/classListClient' || pathname === '/allClassNews' || pathname === '/profile' || pathname === '/my-subject' ? 
                       
                        <NavSiderClient 
                        currentPathname={pathname}
                        userData={userData} 
                        /> 
                        :
                        <NavSiderClass
                        currentPathname={pathname}
                        userData={userData}
                        onBackHome={this.onBackHome}
                        />
                    }
                    <Layout style={{ marginLeft: navSidercollapsed ? LayoutConfigs.NAV_WIDTH_COLLAPSED : LayoutConfigs.NAV_WIDTH_EXPANDED }}>
                        <AppHeader
                            pathname={pathname}
                            navSidercollapsed={navSidercollapsed}
                            onLogout={this.onLogout}
                            onToggleNavSide={this.toggleNavSide}
                            userData={userData || {fullName: 'admin'}}
                        />
                        <Content className="app-content">
                            <div className={`content-wrapper ${contentClass}`}>
                                {React.cloneElement(children, {
                                    changeUserData: this.onChangeUserData,
                                    currentUser: userData,
                                    changeBreadcrumb: this.onChangeBreadcrumb,
                                    showFullScreenLoading,
                                    hideFullScreenLoading
                                })}
                            </div>
                            {/* <Footer className="app-footer">
                                Copyright © IService, All Rights Reserved.
                            </Footer> */}
                        </Content>
                    </Layout>
                </Layout>
            </Spin>
        );
    }
}

const mapStateToProps = state => ({
    fullScreenLoading: state.appCommon.fullScreenLoading || false,
    userProfile: state.account.data || {},
})

const mapDispatchToProps = dispatch => ({
    showFullScreenLoading: () => dispatch(actions.showFullScreenLoading()),
    hideFullScreenLoading: () => dispatch(actions.hideFullScreenLoading()),
    getProfile: () => dispatch(actions.getProfile()),
    logout: () => dispatch(actions.logout()),
    setUserData: (data) => actions.setUserData(data)
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('masterLayout')(MasterLayoutClient));

