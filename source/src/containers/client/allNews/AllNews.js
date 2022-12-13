import React, { useEffect } from 'react';
import { actions } from '../../../actions';
import ClassNewsPage from '../../../compoments/client/classNews/ClassNewsPage';
import ClassClientPage from '../../../compoments/common/appLayoutClient/client/class/ClassClientPage';
import { useDispatch, useSelector } from 'react-redux';
import { classNewsSelector } from '../../../selectors/clientClassNews';
import { showErrorMessage, showSucsessMessage } from '../../../services/notifyService';

function AllNews({ showFullScreenLoading, hideFullScreenLoading }) {
    const dispatch = useDispatch();
	const classNews = useSelector(classNewsSelector);
	
	if (classNews.tbClassNewsLoading) {
		showFullScreenLoading();
	} else {
		hideFullScreenLoading();
	}

    useEffect(() => {
		dispatch(
			actions.getAllClassNews({
				params: {
					page: 0,
					size: 9999
				}
			})
		);
	}, [dispatch]);


  return (
    <ClassNewsPage inClass={false} data={classNews.classNewsData}/>
  )
}

export default AllNews