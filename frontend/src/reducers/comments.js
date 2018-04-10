import * as Types from '../actions/types'

function comments(state={}, action) {
  switch(action.type) {
    case Types.FETCH_COMMENTS_BY_POST_ID:
    case Types.ADD_COMMENT:
      return {
        ...state,
        [action.postId]: action.comments
      }
    case Types.VOTE_COMMENT:
    case Types.UPDATE_COMMENT:
      return {
        ...state,
        [action.postId]: state[action.postId].map(existingComment => {
          if(existingComment.id === action.commentId) {
            existingComment = action.comment
          }
          return existingComment
        })
      }
    case Types.DELETE_COMMENT:
    default:
      return state
  }
}

export default comments
