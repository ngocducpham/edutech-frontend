import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import qs from 'query-string';
import { actions} from '../../../actions';
import AssignmentClassPage from '../../../compoments/common/appLayoutClient/client/assignmentClass/AssignmentClassPage';

const AssignmentClass = () => {
    const dispatch = useDispatch();
    const history = useHistory();


    return (
        <div className='assignment-class-container client-container'>
            {
               <AssignmentClassPage  />
            }
        </div>
    )
}

export default AssignmentClass