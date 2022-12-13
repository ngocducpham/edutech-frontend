import React, { useEffect } from 'react';
import { actions } from '../../../actions';
import ClassNewsPage from '../../../compoments/client/classNews/ClassNewsPage';
import ClassClientPage from '../../../compoments/common/appLayoutClient/client/class/ClassClientPage';
import { useDispatch, useSelector } from 'react-redux';
import { classNewsSelector } from '../../../selectors/clientClassNews';
import { showErrorMessage, showSucsessMessage } from '../../../services/notifyService';

function ClassNews({ showFullScreenLoading, hideFullScreenLoading }) {
	const dispatch = useDispatch();
	const classNews = useSelector(classNewsSelector);
	
	if (classNews.tbClassNewsLoading) {
		showFullScreenLoading();
	} else {
		hideFullScreenLoading();
	}

	useEffect(() => {
		dispatch(
			actions.getClassNewsList({
				params: {
					classId: localStorage.getItem('classId'),
					page: 0,
					size: 9999
				}
			})
		);
	}, [dispatch]);

	const handleCreateNews = (data) => {
		dispatch(
			actions.createClassNews({
				params: {
					classId: localStorage.getItem('classId'),
					content: data.content,
					imageURL: data.image
				},
				onCompleted: () =>{
					showSucsessMessage('Tạo tin tức thành công');
					dispatch(
						actions.getClassNewsList({
							params: {
								classId: localStorage.getItem('classId'),
								page: 0,
								size: 9999
							}
						})
					)},
				onError: () => {
					showErrorMessage('Tạo tin tức thất bại');
				}
			})
		);
	};

	const handleOnDelete = (id) => {
		dispatch(actions.deleteClassNews({
			params: {id: id},
			onCompleted: () => {
				showSucsessMessage('Xoá tin tức thành công');
				dispatch(
					actions.getClassNewsList({
						params: {
							classId: localStorage.getItem('classId'),
							page: 0,
							size: 9999
						}
					})
				)
			},
			onError: () => {
				showErrorMessage('Xoá tin tức thất bại');
			}
		}))
	}

	return (
		<div>
			<ClassNewsPage inClass={true} data={classNews.classNewsData} onDelete={handleOnDelete} onCreate={handleCreateNews} />
		</div>
	);
}

export default ClassNews;
