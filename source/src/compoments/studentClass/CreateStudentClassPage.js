import React from 'react'
import TableTransfer from './TableTransfer'
import { AppConstants, STATUS_LOCK } from '../../constants'
import { Avatar, Button } from 'antd'
import { ArrowLeftOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import Utils from '../../utils'
import StatusTag from '../common/elements/StatusTag'

function CreateStudentClassPage({
    students = [],
    targetKeys = [],
    matchingSearchStudents = [],
    selectedKeysInTargets = [],
    isEditing,
    transferRef,
    listLoading,
    handleBack,
    handleMoveStudent,
    handleSearchStudent,
    handleChangeSelectedKeysInTargets,
    className,
}) {

    const { t } = useTranslation("studentClassListPage")
    const renderItem = (item) => {
        return (
            <div key={item.id} className="item">
                {item.fullName}
            </div>
        )
    }

    const handleFilterOption = (inputValue, item) => {
        return !!matchingSearchStudents.find(student => student.id === item.id)
    }

    const rightTableColumns = [
        {
            title: t("table.fullName"),
            dataIndex: "fullName",
            render: (fullName, dataRow) => {
                return {
                    props: {
                    },
                    children: (
                        <div>{fullName}</div>
                    ),
                }
            }
        },
        {
            title: t("table.fullName"),
            dataIndex: ["major","name"],
            render: (major) => {
                return {
                    children: (
                        <div className='custom'>{major}</div>
                    ),
                }
            }
        },
    ];

    const leftTableColumns = [
        { ...rightTableColumns[0] },
        { ...rightTableColumns[1] }
    ];


    return (
        <div className="container">
            <div className="action">
                <Button
                className="btn-back"
                onClick={handleBack}
                type="primary"
                >
                    <ArrowLeftOutlined /> {t("table.back")}
                </Button>
                <h2>
                    Lớp: {className}
                </h2>
            </div>
            <TableTransfer
                transferRef={transferRef}
                titles={[t("table.studentList"), t("table.studentClass")]}
                dataSource={students.map(e =>  ({...e, key: e.id}))}
                targetKeys={targetKeys}
                showSearch
                leftColumns={leftTableColumns}
                rightColumns={rightTableColumns}
                loading={listLoading}
                listStyle={{
                    flex: 1,
                    height: '100%',
                }}
                locale={{
                    searchPlaceholder: t("table.searchPlaceHolder"),
                    itemUnit: t("table.student"),
                    itemsUnit: t("table.student"),
                    remove: t("table.delete"),
                    selectAll: t("table.selectAll"),
                    selectCurrent: t("table.selectCurrent"),
                    selectInvert: t("table.selectInvert"),
                    removeAll: t("table.removeAll"),
                    removeCurrent: t("table.removeCurrent"),
                }}
                showHeader={false}
                pagination={false}
                selectionWidth={46}
                filterOption={(inputValue, item) => handleFilterOption(inputValue, item)}
                onSearch={(direction, value) => handleSearchStudent(direction, value)}
                onChange={handleMoveStudent}
                onSelectChange={handleChangeSelectedKeysInTargets}
            />
        </div>
    )
}

export default CreateStudentClassPage
