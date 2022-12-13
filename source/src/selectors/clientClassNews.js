import { createSelector } from 'reselect'

export const classNewsSelector = createSelector(
    [state => state.classNews],
    classNews => classNews
)