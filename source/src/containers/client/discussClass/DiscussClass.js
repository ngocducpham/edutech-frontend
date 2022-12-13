import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation  } from 'react-router-dom'
import qs from 'query-string';

import DiscussClassPage from '../../../compoments/common/appLayoutClient/client/discussClass/DiscussClassPage';

import { actions} from '../../../actions';
import {discussClassSelector } from '../../../selectors/ClientDiscuss';
import { showSucsessMessage, showErrorMessage } from '../../../services/notifyService';


const DiscussClass = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classId = Number(window.localStorage.getItem("classId"));
    const [listLoading, setListLoading] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const classDiscussListData = useSelector(discussClassSelector);


    const getClassDiscussListClient = () => {
        dispatch(
            actions.getClassDiscussListClient({
                params: {classId},
            })
        )
    }

    useEffect(() => {
        getClassDiscussListClient();
    },[])

    console.log("classDiscussListData", classDiscussListData)
    return (
        <div className='discuss-class-container client-container'>
            {
                classDiscussListData && <DiscussClassPage data={classDiscussListData} />
            }
            
        </div>
    )
}

export default DiscussClass