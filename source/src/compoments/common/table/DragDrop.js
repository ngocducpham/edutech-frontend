import React, { useEffect, useRef, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { actions } from "../../../actions";
import { Table } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import { useDispatch } from 'react-redux'
import { showErrorMessage } from '../../../services/notifyService';
import { UserTypes } from '../../../constants';
import { sendRequest } from '../../../services/apiService';
import apiConfig from '../../../constants/apiConfig';

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
));

let columns = [
  {
    title: '#',
    dataIndex: 'sort',
    width: 10,
    className: 'drag-visible',
    render: () => <DragHandle />,
  }
];

const SortableItem = SortableElement((props) => <tr {...props} />);
const SortableBody = SortableContainer((props) => <tbody {...props} />);

const DragDrop = (props) => {
  const moveData = useRef(props.dataSource);
  const [, render] = useState();

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      props.onDragDrop(moveData.current[oldIndex].id, moveData.current[newIndex].order);
      const newData = arrayMoveImmutable(moveData.current.slice(), oldIndex, newIndex).filter(
        (el) => !!el,
      );
      moveData.current = newData;

      render(Symbol());
      reloadData();
    }
  };

  useEffect(() => {
    moveData.current = props.dataSource;
    render({});
  },[props.dataSource]);

  const reloadData = async () =>{
    setTimeout(async () => {
      try {
        const apiParams = {
            ...apiConfig.chapter.getById,
            path: `${apiConfig.chapter.getById.path}/${props.chapterId}`
        }
        const result = await sendRequest(apiParams);
        if(result.responseData && result.responseData.data){
          moveData.current = result.responseData.data.lessons;
        }
    }
    catch (error) {
        
    }
    }, 200);
   
  }

  const DraggableContainer = (props) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    const index = moveData.current?.findIndex(
      (x) => x.id === restProps['data-row-key']
    );
    return <SortableItem index={index} {...restProps} />;
  };


  return (
    <Table
      {...props}
      className={props.className}
      locale={{ emptyText: 'Không có bài học' }}
      showHeader={false}
      loading={props.loading} 
      dataSource={moveData.current}
      pagination={false}
      onChange={props.onChange}
      columns={[...columns, ...props.columns]}
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  );
};

export default DragDrop;
