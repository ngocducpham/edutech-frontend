import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions} from '../../../actions';
import {classListSelector, syllabusListSelector} from '../../../selectors/ClientClass';
import { showSucsessMessage, showErrorMessage } from '../../../services/notifyService';

import { Divider } from 'antd';
import ClassClientPage from '../../../compoments/common/appLayoutClient/client/class/ClassClientPage';

const  ClassClient = ({showFullScreenLoading, hideFullScreenLoading}) => {
    const dispatch = useDispatch();
    const [listLoading, setListLoading] = useState(false);
    const [classDetail, setClassDetail] = useState(null);
    const [dataSyl, setDataSyl] = useState(null);
  
    const classListClientData = useSelector(classListSelector);
    const syllabusListData = useSelector(syllabusListSelector);




    const getClassList = () => {
        let params = {};
        setListLoading(true)
        showFullScreenLoading();
        dispatch(
            actions.getClassListClient({
                params,
                onCompleted: (classData) => {
                    setClassDetail(classData?.data?.data)
                    setListLoading(false)
                    hideFullScreenLoading();
                },
                onError: () => { 
                    setListLoading(false)
                    hideFullScreenLoading();
                },
            })
        )
    }

    const getSyllabusListClass = (subjectId) => {
        setListLoading(true)
        dispatch(
            actions.getSyllabusListClass({
                params: {subjectId},
                omCompleted: (syllabusData) => {
                    setDataSyl(syllabusData?.data)
                    setListLoading(false)
                },
                onError: () => { 
                    setListLoading(false)
                },
            })
        )
    }

   

    const updateClassClient = (values) => {
        dispatch(
            actions.updateClassClient({
                params: {
                    ...values,
                },
                onCompleted: () =>{
                    showSucsessMessage('Cập nhật thành công')
					dispatch(
						actions.getClassListClient({
                            params: {}
                        })
					)},
				onError: (err) => {
                    showErrorMessage('Cập nhật thất bại')
                    console.log(err)
				}
            })
        )
    }

    useEffect(() => {
        getClassList();
    }, [])



    return (
        <div className='class-list-container client-page-with-aside'>
            {
                classListClientData && 
                <ClassClientPage 
                data={classListClientData} 
                dataSyl={syllabusListData}
                getSyllabusList={getSyllabusListClass}
                onUpdate={updateClassClient}
                />
            }            
        </div>
    )
}

export default ClassClient