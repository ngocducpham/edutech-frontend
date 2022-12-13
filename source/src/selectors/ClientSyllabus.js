import { createSelector } from 'reselect'

export const syllabusSelector = createSelector(
    [state => state.classv1],
    classv1 => classv1.syllabusClientData
)
