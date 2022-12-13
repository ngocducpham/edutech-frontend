import { createSelector } from 'reselect'

export const classListSelector = createSelector(
    [state => state.classv1],
    classv1 => classv1.classListClientData
)

export const syllabusListSelector = createSelector(
    [state => state.classv1],
    classv1 => classv1.syllabusListData
)