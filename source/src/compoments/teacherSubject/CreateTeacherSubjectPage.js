import React from 'react'
import TableTransfer from './TableTransfer'
import { AppConstants, STATUS_LOCK } from '../../constants'
import { Avatar, Button } from 'antd'
import { ArrowLeftOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import Utils from '../../utils'
import StatusTag from '../common/elements/StatusTag'

function CreateTeacherSubjectPage({
    subjects = [],
    targetKeys = [],
    matchingSearchSubjects = [],
    selectedKeysInTargets = [],
    isEditing,
    transferRef,
    listLoading,
    handleBack,
    handleMoveSubject,
    handleSearchSubject,
    handleChangeSelectedKeysInTargets,
    teacherName,
}) {

    const { t } = useTranslation("teacherSubjectListPage")
    const renderItem = (item) => {
        return (
            <div key={item.id} className="item" style={{backgroundColor: item.labelColor}}>
                {item.name}
            </div>
        )
    }

    const handleFilterOption = (inputValue, item) => {
        return !!matchingSearchSubjects.find(subject => subject.id === item.id)
    }

    const rightTableColumns = [
        {
            title: t("table.name"),
            dataIndex: "name",
            render: (name, dataRow) => {
                return {
                    props: {
                    },
                    children: (
                        <div>{name}</div>
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
                    GV: {teacherName}
                </h2>
            </div>
            <TableTransfer
                transferRef={transferRef}
                titles={[t("table.subjectList"), t("table.teacherSubject")]}
                dataSource={subjects.map(e => ({...e, key: e.id}))}
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
                    itemUnit: t("table.subject"),
                    itemsUnit: t("table.subject"),
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
                onSearch={(direction, value) => handleSearchSubject(direction, value)}
                onChange={handleMoveSubject}
                onSelectChange={handleChangeSelectedKeysInTargets}
            />
        </div>
    )
}

export default CreateTeacherSubjectPage
