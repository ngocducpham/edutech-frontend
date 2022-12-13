import { createSelector } from 'reselect'

export const assignmentClassListSelector = createSelector(
    [state => state.assignmentClass],
    assignmentClass => assignmentClass.assignmentClassListData
)

export const assignmentClassSelector = createSelector(
    [state => state.assignmentClass],
    assignmentClass => assignmentClass.assignmentClassData
)

export const assignmentClassLessonSelector = createSelector(
    [state => state.assignmentClass],
    assignmentClass => assignmentClass.assignmentClassLessonData
)

export const assignmentClientSelector = createSelector(
    [state => state.assignmentClass],
    assignmentClass => assignmentClass.assignmentClientData
)


