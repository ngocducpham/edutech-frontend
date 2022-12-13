import { createSelector } from 'reselect'

export const studentClassListSelector = createSelector(
    [state => state.classv1],
    classv1 => classv1.studentClassListClientData
)
