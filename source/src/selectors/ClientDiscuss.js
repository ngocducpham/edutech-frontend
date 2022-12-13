import { createSelector } from 'reselect'

export const discussSelector = createSelector(
    [state => state.discuss],
    discuss => discuss.lessonDiscussListData
)

export const discussClientSelector = createSelector(
    [state => state.discuss],
    discuss => discuss.discussClientData
)

export const discussClassSelector = createSelector(
    [state => state.discuss],
    discuss => discuss.classDiscussListData
)

export const commentSelector = createSelector(
    [state => state.discuss],
    discuss => discuss.commentListData
)

export const childCommentSelector = createSelector(
    [state => state.discuss],
    discuss => discuss.childCommentListData
)