import React from 'react';
import { Route } from 'react-router-dom';
import Utils from '../utils';


import MasterLayoutClient from '../compoments/common/appLayoutClient/MasterLayoutClient';
import { sitePathConfig } from '../constants/sitePathConfig';

const ClientRoute = ({ component: Component, ...rest }) => {
    const siteConfig = Object.values(sitePathConfig).find(s => s.path === rest.path)?.siteConfig
    return (
        <Route {...rest} render={props => 
                (
                     <MasterLayoutClient {...props} siteConfig={siteConfig}>
                     <Component {...props}/>
                 </MasterLayoutClient>
                )
            }
        />
    )
}

export default ClientRoute;
