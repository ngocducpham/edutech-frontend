import { createSelector } from 'reselect'

export const chapterSelector = createSelector(
    [state => state.lesson],
    lesson => lesson.chapterClientData
)
