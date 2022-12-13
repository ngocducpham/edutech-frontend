import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation  } from 'react-router-dom'
import qs from 'query-string';

import { actions} from '../../../actions';
import {syllabusSelector} from '../../../selectors/ClientSyllabus'
import SyllabusClientPage from '../../../compoments/common/appLayoutClient/client/syllabus/SyllabusClientPage';


const SyllabusClient = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const id = Number(window.localStorage.getItem("classId"));
    const [listLoading, setListLoading] = useState(false);
    const [syllabusDetail, setSyllabusDetail] = useState(null);
    const syllabusClientData = useSelector(syllabusSelector)
    

    const getSyllabusList = () => {
        setListLoading(true)
        dispatch(
            actions.getSyllabusClient({
                params: {id},
                omCompleted: (syllabusData) => {
                    setSyllabusDetail(syllabusData?.data)
                    setListLoading(false)
                },
                onError: () => { 
                    setListLoading(false)
                },
            })
        )
    }

    useEffect(() => {
        getSyllabusList()
    }, [])


    return (
        <div className='syllabus-container'>
            {
                syllabusClientData && <SyllabusClientPage data={syllabusClientData} />
            }
        </div>
    )
}

export default SyllabusClient