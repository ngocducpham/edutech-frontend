import { createSelector } from 'reselect'

export const chapterLessonSelector = createSelector(
    [state => state.syllabus],
    syllabus => syllabus.chapterLessonClientData
)

export const chapterlsSelector = createSelector(
    [state => state.chapter],
    chapter => chapter.chapterClientClassData
)
