import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Fuse from 'fuse.js'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'

import CreateStudentClassPage from '../../compoments/studentClass/CreateStudentClassPage'
import { actions } from '../../actions'
import { showErrorMessage, showSucsessMessage } from '../../services/notifyService';

const { confirm } = Modal

const CreateStudentClass = ({
    isEditing,
    handleBack,
    classId,
    studentClassData,
    fetchStudentClassList,
    className,
}) => {
    const { t } = useTranslation("studentClassListPage")

    const transferRef = useRef()
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [students, setStudents] = useState([])
    const [targetKeys, setTargetKeys] = useState([])
    const [listLoading, setListLoading] = useState(false)
    const [fuse, setFuse] = useState()
    const [matchingSearchStudents, setMatchingSearchStudents]=  useState([])
    const [dataDetail, setDataDetail] = useState({})
    const [selectedKeysInTargets, setSelectedKeysInTargets] = useState([])
    const [selectedKeysInLeft, setSelectedKeysInLeft] = useState([])
    const [selectedKeysInRight, setSelectedKeysInRight] = useState([])
    const [formLoading, setFormLoading] = useState(false)

    console.log("studentClassData", studentClassData)


    const buildIndex = (data) => {
        setFuse(new Fuse(data, {
            includeScore: true,
            threshold: 0.4,
            keys: ["fullName"]
        }))
    }

    const prepareCreateData = (students) => {
        return students
        .filter(student => selectedKeysInLeft.includes(student.id))
    }



    const sendCreatingRequest = () => {
        setListLoading(true)
        dispatch(actions.addStudentClass({
            params: prepareCreateData(students),

            onCompleted: () => {
                setListLoading(false)
                fetchStudentClassList(1000)
                setSelectedKeysInTargets([])
                transferRef.current.setStateKeys('left', [])
                showSucsessMessage(t("showSuccessMessage.add"), { t, ns: 'listBasePage' })
            },
            onError: (err) => {
                setListLoading(false)
                showErrorMessage(err ? err.message : t("showErrorMessage.add"), { t, ns: 'listBasePage' })
            }
        }))
    }

    const handleDelete = () => {
        setListLoading(true)
        dispatch(actions.removeStudentClass({
            params: prepareDeleteData(students),
            onCompleted: () => {
                setListLoading(false)
                fetchStudentClassList(1000)
                setSelectedKeysInTargets([])
                transferRef.current.setStateKeys('right', [])
                showSucsessMessage(t("showSuccessMessage.delete"), { t, ns: 'listBasePage' })
            },
            onError: (err) => {
                setListLoading(false)
                showErrorMessage(err ? err.message : t("showErrorMessage.add"), { t, ns: 'listBasePage' })
            }
        }))
    }

    
    const handleChangeSelectedKeysInTargets = (sourceSelectedKeys, targetSelectedKeys) => {
       setSelectedKeysInTargets(targetSelectedKeys)
       setSelectedKeysInLeft(sourceSelectedKeys)
    }
 

    const handleSearchStudent = (direction, value) => {
        const res = fuse && fuse.search(value)
        if(!value) {
            setMatchingSearchStudents(fuse?._docs)
        }
        else {
            setMatchingSearchStudents(res.map(e => {
                return e.item
            }))
        }
    }

    const handleMoveStudent = (targetKeys, direction, moveKeys) => {
            if(direction === 'left') {
                setSelectedKeysInTargets(moveKeys)
                transferRef.current.setStateKeys('right', [...moveKeys])
                confirm({
                    title: t("createPage.confirmDelete"),
                    content: '',
                    okText: t("createPage.yes"),
                    okType: 'danger',
                    cancelText: t("createPage.no"),
                    onOk: () => {
                        handleDelete()
                    },
                    onCancel() {
                        // console.log('Cancel');
                    },
                });
            }else{
                setSelectedKeysInLeft(moveKeys)
                transferRef.current.setStateKeys('left', [...moveKeys])
                confirm({
                    title: t("createPage.confirmAdd"),
                    content: '',
                    okText: t("createPage.yes"),
                    okType: 'primary',
                    cancelText: t("createPage.no"),
                    onOk: () => {
                        sendCreatingRequest()
                    },
                    onCancel() {
                        // console.log('Cancel');
                    },
                });
            }
    }



    const prepareDeleteData = (students) => {
        return students
        .filter(student => selectedKeysInTargets.includes(student.id))
    }

    const mergeAutoCompleteWithDataList = (students) => {
        return students.map(student => {
            const cllStudent = studentClassData.find(cllStudent => cllStudent.id === student.id)
            const mappedStudent = {
                ...student,
            }
            if(cllStudent) {
                mappedStudent.studentClassId = cllStudent.id;
            }
            if(!cllStudent){
                delete mappedStudent.studentClassId
            }
            return mappedStudent
        })
    }

    const handleMergeCurrentDataWithDataList = () => {
        const newStudents = mergeAutoCompleteWithDataList(students).filter(stu => stu.status === 1)
        setStudents(newStudents)
        setTargetKeys(
            newStudents.filter(student => student.studentClassId)
            .map(student => student.id)
        )
    }

    const fetchStudentList = () => {
        setListLoading(true)
        dispatch(actions.getStudentAutoComplete({
            onCompleted: (students = []) => {
                setStudents(students.map(student =>  ({
                    ...student,
                    classId,
                    studentId: student.id,
                })))
                setListLoading(false)
            },
        }))
    }


    useEffect(() => {
        fetchStudentList()
    }, [])

    useEffect(() => {
        buildIndex(students)
    }, [students])


    useEffect(() => {
        students.length > 0
        && studentClassData
        && handleMergeCurrentDataWithDataList()
    }, [studentClassData, JSON.stringify(students)])




    return (<>
        <CreateStudentClassPage
        students={students}
        targetKeys={targetKeys}
        matchingSearchStudents={matchingSearchStudents}
        selectedKeysInTargets={selectedKeysInTargets}
        transferRef={transferRef}
        listLoading={listLoading}
        className={className}
        handleBack={handleBack}
        handleChangeSelectedKeysInTargets={handleChangeSelectedKeysInTargets}
        handleMoveStudent={handleMoveStudent}
        handleSearchStudent={handleSearchStudent}
        />
        </>
    )
}

export default CreateStudentClass