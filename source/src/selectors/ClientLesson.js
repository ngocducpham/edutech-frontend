import { createSelector } from 'reselect'

export const lessonSelector = createSelector(
    [state => state.lesson],
    lesson => lesson.lessonClientData
)
