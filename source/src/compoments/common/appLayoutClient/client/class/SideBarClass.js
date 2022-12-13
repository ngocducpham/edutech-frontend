import React, { Component } from 'react';
import { Layout } from 'antd';
import Calender from './Calender';
import { Divider } from 'antd';


class SideBarClass extends Component {
    render() {
        return (
           <div className='sidebarClass'>
                <div className='calender'>
                <div className='title'>Lịch</div>
                <Calender />
                </div>
                
                <Divider className='divider' />
                <div className='fnews'><div className='news'>Thông báo</div></div>
           </div>
        )
    }
}

export default SideBarClass;
