import { createSelector } from 'reselect'

export const questionSelector = createSelector(
    [state => state.question],
    question => question.questionClientData
)
