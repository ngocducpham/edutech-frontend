import { Avatar, Button, Dropdown, Menu, Upload, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useCallback, useRef, useState } from 'react';
import {
	PictureOutlined,
	EllipsisOutlined,
	PushpinOutlined,
	EditOutlined,
	DeleteOutlined,
	CloseOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { actions, types } from '../../../actions';
import { showErrorMessage, showSucsessMessage } from '../../../services/notifyService';
import { AppConstants, UserTypes } from '../../../constants';
import { actions as userAction } from '../../../actions/account';

function ClassNewsPage({ data, inClass, onCreate, onDelete, onUpload }) {
	const pinedNews = data?.filter((item) => item.pintop);
	const normalNews = data?.filter((item) => !item.pintop);
	const dispatch = useDispatch();
	const [content, setContent] = useState('');
	const [imgSrc, setImgSrc] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const acceptImage = '.png,.jpeg,.jpg';
	const [updateNewsLoading, setUpdateNewsLoading] = useState(false);
	const [newsId, setNewsId] = useState(null);
	const [newsEditData, setNewsEditData] = useState('');
	const [newsEditImg, setNewsEditImg] = useState('');
	const [newsEditContent, setNewsEditContent] = useState('');
	const uploadImageRef = useRef(null);
	const userData = userAction.getUserData();

	const validateFileUpload = (file, accept) => {
		if (!accept.includes(file.type.split('/')[1])) {
			showErrorMessage(`${file.name} không đúng định dạng`);
			return false;
		}
		if (file.size > 1048576 * 20) {
			showErrorMessage(`${file.name} dung lượng vượt qua 20MB`);
			return false;
		}
		return true;
	};

	const handleOnNewsUpdate = (id) => {};

	const uploadImageProps = {
		name: 'file',
		accept: acceptImage,
		customRequest: ({ file, onSuccess, onError }) => {
			if (!validateFileUpload(file, acceptImage)) {
				onError();
				return;
			}
			dispatch(
				actions.uploadImage({
					params: {
						files: { file },
						classId: localStorage.getItem('classId')
					},
					onCompleted: (res) => {
						setImgSrc(
							res.data[0].fileDownloadUri
								.replace(
									'http://lms-api.developteam.net',
									AppConstants.apiRootUrl + '/v1/resource/client-get-file-classnews'
								)
								.replace('/TEMP', '')
						);
						setTimeout(() => {
							onSuccess();
						}, 100);
					},
					onError: (err) => {
						onError();
						showErrorMessage('Upload ảnh thất bại');
					}
				})
			);
		},
		showUploadList: false,
		onChange(info) {
			if (info.file.status !== 'uploading') {
				// console.log(info.file, info.fileList);
			}
			if (info.file.status === 'done') {
				// setImgSrc(info.file.response.data);
			}
		}
	};

	const handleUpdateNews = (data) => {
		dispatch(
			actions.updateClassNews({
				params: {
					id: data.id,
					content: data.content,
					pintop: data.pintop,
					imageURL: data.image
				},
				onCompleted: () => {
					dispatch(
						actions.getClassNewsList({
							params: {
								classId: localStorage.getItem('classId'),
								page: 0,
								size: 9999
							}
						})
					);
				},
				onError: () => {}
			})
		);
	};

	const editImageProps = {
		name: 'file',
		accept: acceptImage,
		customRequest: ({ file, onSuccess, onError }) => {
			if (!validateFileUpload(file, acceptImage)) {
				onError();
				return;
			}
			dispatch(
				actions.uploadImage({
					params: {
						files: { file },
						classId: localStorage.getItem('classId')
					},
					onCompleted: (res) => {
						setNewsEditImg(
							res.data[0].fileDownloadUri
								.replace(
									'http://lms-api.developteam.net',
									AppConstants.apiRootUrl + '/v1/resource/client-get-file-classnews'
								)
								.replace('/TEMP', '')
						);
						setTimeout(() => {
							onSuccess();
						}, 100);
					},
					onError: (err) => {
						onError();
						showErrorMessage('Upload ảnh thất bại');
					}
				})
			);
		},
		showUploadList: false,
		onChange(info) {
			if (info.file.status !== 'uploading') {
				// console.log(info.file, info.fileList);
			}
			if (info.file.status === 'done') {
				// setImgSrc(info.file.response.data);
			}
		}
	};

	const renderNews = useCallback(
		(news) => (
			<div
				key={news.id}
				style={{
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: '#fff',
					borderRadius: 8,
					border: '1px solid #D8DCF0',
					padding: 20,
					marginBottom: '20px'
				}}
			>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
						<Avatar size={40} src={AppConstants.apiRootUrl + '/v1/file/download' + news.teacherAvatar} />
						<div>
							<div style={{ fontWeight: 600, fontSize: 15 }}>{news.teacherName}</div>
							<div style={{ fontWeight: 400, fontSize: 11 }}>Vào lúc {news.created}</div>
						</div>
					</div>
					<div>
						{inClass && userData.kind === UserTypes.TEACHER && (
							<Dropdown
								trigger={['click']}
								overlay={
									<Menu>
										<Menu.Item
											onClick={() =>
												handleUpdateNews({ pintop: true, id: news.id, content: news.content })
											}
											icon={<PushpinOutlined />}
										>
											Ghim tin tức
										</Menu.Item>
										<Menu.Item
											onClick={() => {
												setModalVisible(true);
												setNewsEditData(news);
												setNewsEditImg(news.imageURL);
												setNewsEditContent(news.content);
											}}
											icon={<EditOutlined />}
										>
											Chỉnh sửa tin tức
										</Menu.Item>
										<Menu.Item onClick={() => deleteNewsConfirm(news.id)} icon={<DeleteOutlined />}>
											Xóa tin tức
										</Menu.Item>
									</Menu>
								}
							>
								<Button type='text' icon={<EllipsisOutlined rotate={90} />} />
							</Dropdown>
						)}
					</div>
				</div>
				<div style={{ marginTop: 20 }}>
					<div style={{ fontSize: 15 }}>{news.content}</div>
					<img
						style={{
							marginTop: 10,
							borderRadius: 8,
							objectFit: 'cover',
							width: '100%',
							maxHeight: 350
						}}
						src={news.imageURL}
						alt=''
					/>
				</div>
			</div>
		),
		[]
	);

	// const renderCreateNews = useCallback(
	// 	(handleUpload, mode = 'upload') => (

	// 	),
	// 	[content, imgSrc, uploadImageProps]
	// );

	const deleteNewsConfirm = useCallback(
		(id) => {
			Modal.confirm({
				title: 'Xóa tin tức',
				content: 'Bạn có chắc muốn xóa tin tức này?',
				okText: 'Xóa',
				cancelText: 'Hủy',
				okType: 'danger',
				onOk: () => {
					onDelete(id);
				}
			});
		},
		[onDelete]
	);

	return (
	<div style={{ margin: '20px auto', width: 650 }}>
			<Modal
				width={650}
				footer={null}
				onCancel={() => setModalVisible(false)}
				title='Chỉnh sửa tin tức'
				visible={modalVisible}
				confirmLoading={updateNewsLoading}
				onOk={() => handleOnNewsUpdate(newsEditData.id)}
			>
				<div>
					<div style={{ borderBottom: '1px solid #D8DCF0', borderTop: 10 }}>
						<TextArea
							style={{
								border: 'none',
								outline: 'none',
								WebkitBoxShadow: 'none',
								boxShadow: 'none',
								resize: 'none'
							}}
							value={newsEditContent}
							placeholder='Nhập nội dung tin tức lớp học'
							autoSize={{ minRows: 3, maxRows: 3 }}
							onChange={(e) => setNewsEditContent(e.target.value)}
						/>
						<div style={{ position: 'relative' }}>
							{newsEditImg && (
								<Button
									onClick={() => setNewsEditImg('')}
									shape='circle'
									type='primary'
									size='small'
									style={{ position: 'absolute', top: 10, right: 7 }}
									icon={<CloseOutlined />}
								/>
							)}
							<img
								style={{
									display: 'block',
									margin: '20px 0',
									borderRadius: 8,
									objectFit: 'cover',
									width: '100%',
									maxHeight: 350
								}}
								src={newsEditImg}
								alt=''
							/>
						</div>
					</div>
					<div style={{ display: 'flex', marginTop: 10, gap: '0px 10px', justifyContent: 'flex-end' }}>
						<Upload {...editImageProps}>
							<Button icon={<PictureOutlined />} type='text' style={{ borderRight: '1px solid #D8DCF0' }}>
								{newsEditImg ? 'Thay đổi hình ảnh' : 'Thêm hình ảnh'}
							</Button>
						</Upload>
						<Button
							onClick={() => {
								handleUpdateNews({
									content: newsEditContent,
									image: newsEditImg,
									id: newsEditData.id
								});
								setNewsEditImg('');
								setNewsEditContent('');
								setModalVisible(false);
							}}
							type='primary'
						>
							Đăng tin
						</Button>
					</div>
				</div>
			</Modal>
			{inClass && userData.kind === UserTypes.TEACHER && (
				<div
					style={{
						backgroundColor: '#fff',
						borderRadius: 8,
						border: '1px solid #D8DCF0',
						padding: 20,
						marginBottom: 40
					}}
				>
					<div style={{ borderBottom: '1px solid #D8DCF0', borderTop: 10 }}>
						<TextArea
							style={{
								border: 'none',
								outline: 'none',
								WebkitBoxShadow: 'none',
								boxShadow: 'none',
								resize: 'none'
							}}
							value={content}
							placeholder='Nhập nội dung tin tức lớp học'
							autoSize={{ minRows: 3, maxRows: 3 }}
							onChange={(e) => setContent(e.target.value)}
						/>
						<div style={{ position: 'relative' }}>
							{imgSrc && (
								<>
									<Button
										onClick={() => setImgSrc('')}
										shape='circle'
										type='primary'
										size='small'
										style={{ position: 'absolute', top: 10, right: 7 }}
										icon={<CloseOutlined />}
									/>
									<img
										style={{
											display: 'block',
											margin: '20px 0',
											borderRadius: 8,
											objectFit: 'cover',
											width: '100%',
											maxHeight: 350
										}}
										src={imgSrc}
										alt=''
									/>
								</>
							)}
						</div>
					</div>
					<div style={{ display: 'flex', marginTop: 10, gap: '0px 10px', justifyContent: 'flex-end' }}>
						<Upload {...uploadImageProps}>
							<Button icon={<PictureOutlined />} type='text' style={{ borderRight: '1px solid #D8DCF0' }}>
								{imgSrc ? 'Thay đổi hình ảnh' : 'Thêm hình ảnh'}
							</Button>
						</Upload>
						<Button
							onClick={() => {
								onCreate({
									content: content,
									image: imgSrc
								});
								setImgSrc('');
								setContent('');
							}}
							type='primary'
						>
							Đăng tin
						</Button>
					</div>
				</div>
			)}
			{inClass && pinedNews?.length > 0 && (
				<>
					<div style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 10 }}>
						<PushpinOutlined /> Tin tức đã ghim
					</div>
					{pinedNews?.map((news) => renderNews(news))}
				</>
			)}
			{inClass && normalNews?.length > 0 && (
				<div style={{ marginTop: 40 }}>
					{pinedNews.length > 0 && (
						<div style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 10 }}>Tin tức khác</div>
					)}
					{normalNews?.map((news) => renderNews(news))}
				</div>
			)}
			{!inClass && data?.length > 0 && (
				<div style={{ marginTop: 40 }}>{data?.map((news) => renderNews(news))}</div>
			)}
		</div>
	);
}

export default ClassNewsPage;
