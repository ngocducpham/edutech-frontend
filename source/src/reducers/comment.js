// import { actionTypes, reduxUtil } from '../actions/comment';

// const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
// const {
//     GET_COMMENT_LIST_CLIENT,
//     DELETE_COMMENT_CLIENT,
// } = actionTypes;

// const initialState = {
//     commentListData: [],
//     commentLoading: false,
// };

// const reducer = createReducer({
//     [defineActionLoading(GET_COMMENT_LIST_CLIENT)]: (state) => {
//         return {
//             ...state,
//             commentLoading: true
//         }
//     },
//     [defineActionSuccess(GET_COMMENT_LIST_CLIENT)]: (state, { commentListData }) => {
//         return {
//             ...state,
//             commentListData,
//             commentLoading: false
//         }
//     },
//     [defineActionLoading(DELETE_COMMENT_CLIENT)]: (state) => {
//         return {
//             ...state,
//             commentLoading: true,
//         }
//     },
//     [defineActionFailed(DELETE_COMMENT_CLIENT)]: (state) => {
//         return {
//             ...state,
//             commentLoading: false,
//         }
//     },
//     initialState
// })

// export default {
//     reducer
// };
