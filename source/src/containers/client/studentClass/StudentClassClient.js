import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import qs from 'query-string';

import { actions} from '../../../actions';
import {studentClassListSelector} from '../../../selectors/ClientStudentClass'
import StudentClassClientPage from '../../../compoments/common/appLayoutClient/client/studentClass/StudentClassClientPage';

const strParams = params => {
    return qs.stringify(params)
}

const  StudentClassClient = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const id = Number(window.localStorage.getItem("classId"));
    const [listLoading, setListLoading] = useState(false);
    const [studentClassDetail, setStudentClassDetail] = useState(null);
    const studentClassListClientData = useSelector(studentClassListSelector)

    const getStudentClassList = () => {
        setListLoading(true)
        dispatch(
            actions.getStudentClassListClient({
                params: {id},
                omCompleted: (studentData) => {
                    setStudentClassDetail(studentData?.data?.data)
                    setListLoading(false)
                },
                onError: () => { 
                    setListLoading(false)
                },
            })
        )
    }

    useEffect(() => {
        getStudentClassList()
    }, [])


    return (
        <div className='student-class-list-container client-container'>
            {
                studentClassListClientData && <StudentClassClientPage data={studentClassListClientData} />
            }
        </div>
    )
}

export default StudentClassClient