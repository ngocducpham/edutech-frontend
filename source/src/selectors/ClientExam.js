import { createSelector } from 'reselect'

export const examAssignmentSelector = createSelector(
    [state => state.exam],
    exam => exam.examAssignmentData
)

export const examClientDoExam = createSelector(
    [state => state.exam],
    exam => exam.examClientDoExamData
)