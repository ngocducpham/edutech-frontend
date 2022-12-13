import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Fuse from 'fuse.js'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'

import CreateTeacherSubjectPage from '../../compoments/teacherSubject/CreateTeacherSubjectPage';
import { actions } from '../../actions'
import { showErrorMessage, showSucsessMessage } from '../../services/notifyService';

const { confirm } = Modal

const CreateTeacherSubject = ({
    isEditing,
    handleBack,
    teacherId,
    teacherSubjectData,
    fetchTeacherSubjectList,
    teacherName,
}) => {
    const { t } = useTranslation("teacherSubjectListPage")

    const transferRef = useRef()
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [subjects, setSubjects] = useState([])
    const [targetKeys, setTargetKeys] = useState([])
    const [listLoading, setListLoading] = useState(false)
    const [fuse, setFuse] = useState()
    const [matchingSearchSubjects, setMatchingSearchSubjects]=  useState([])
    const [dataDetail, setDataDetail] = useState({})
    const [selectedKeysInTargets, setSelectedKeysInTargets] = useState([])
    const [selectedKeysInLeft, setSelectedKeysInLeft] = useState([])
    const [selectedKeysInRight, setSelectedKeysInRight] = useState([])
    const [formLoading, setFormLoading] = useState(false)
    console.log("teacherSubjectData", teacherSubjectData)

    const buildIndex = (data) => {
        setFuse(new Fuse(data, {
            includeScore: true,
            threshold: 0.4,
            keys: ["name"]
        }))
    }

    const prepareCreateData = (subjects) => {
        return subjects
        .filter(subject => selectedKeysInLeft.includes(subject.id))
    }



    const sendCreatingRequest = () => {
        setListLoading(true)
        dispatch(actions.addTeacherSubject({
            params: prepareCreateData(subjects),
            onCompleted: () => {
                setListLoading(false)
                fetchTeacherSubjectList(1000)
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
        dispatch(actions.removeTeacherSubject({
            params: prepareDeleteData(subjects),
            onCompleted: () => {
                setListLoading(false)
                fetchTeacherSubjectList(1000)
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
 

    const handleSearchSubject = (direction, value) => {
        const res = fuse && fuse.search(value)
        if(!value) {
            setMatchingSearchSubjects(fuse?._docs)
        }
        else {
            setMatchingSearchSubjects(res.map(e => {
                return e.item
            }))
        }
    }

    const handleMoveSubject = (targetKeys, direction, moveKeys) => {
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



    const prepareDeleteData = (subjects) => {
        return subjects
        .filter(subject => selectedKeysInTargets.includes(subject.id))
    }

    const mergeAutoCompleteWithDataList = (subjects) => {
        return subjects.map(subject => {
            const cllSubject = teacherSubjectData.find(cllSubject => cllSubject.id === subject.id)
            const mappedSubject = {
                ...subject,
            }
            if(cllSubject) {
                mappedSubject.teacherSubjectId = cllSubject.id;
            }
            if(!cllSubject){
                delete mappedSubject.teacherSubjectId
            }
            return mappedSubject
        })
    }

    const handleMergeCurrentDataWithDataList = () => {
        const newSubjects = mergeAutoCompleteWithDataList(subjects)
        setSubjects(newSubjects)
        setTargetKeys(
            newSubjects.filter(subject => subject.teacherSubjectId)
            .map(subject => subject.id)
        )
    }

    const fetchAutocompleteSubjectList = () => {
        setListLoading(true)
        dispatch(actions.getSubjectAutocomplete({
            onCompleted: (subjects = []) => {
                setSubjects(subjects.map(subject => ({
                    ...subject,
                    teacherId,
                    subjectId: subject.id,
                })))
                setListLoading(false)
            },
        }))
    }


    useEffect(() => {
        fetchAutocompleteSubjectList()
    }, [])

    useEffect(() => {
        buildIndex(subjects)
    }, [subjects])


    useEffect(() => {
        subjects.length > 0
        && teacherSubjectData
        && handleMergeCurrentDataWithDataList()
    }, [teacherSubjectData, JSON.stringify(subjects)])




    return (<>
        <CreateTeacherSubjectPage
        subjects={subjects}
        targetKeys={targetKeys}
        matchingSearchSubjects={matchingSearchSubjects}
        selectedKeysInTargets={selectedKeysInTargets}
        transferRef={transferRef}
        listLoading={listLoading}
        teacherName={teacherName}
        handleBack={handleBack}
        handleChangeSelectedKeysInTargets={handleChangeSelectedKeysInTargets}
        handleMoveSubject={handleMoveSubject}
        handleSearchSubject={handleSearchSubject}
        />
        </>
    )
}

export default CreateTeacherSubject