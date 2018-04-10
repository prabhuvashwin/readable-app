import * as Types from '../actions/types'

function comments(state={}, action) {
  const { comments, commentId, postId, updatedComment, comment} = action
  switch(action.type) {
    case Types.FETCH_COMMENTS:
    case Types.ADD_COMMENT:
      return {
        ...state,
        [postId]: comments
      }
    case Types.VOTE_COMMENT:
    case Types.UPDATE_COMMENT:
      return {
        ...state,
        [postId]: state[postId].map(comment => {
          if(comment.id === commentId) {
            comment = updatedComment
          }
          return comment
        })
      }
    case Types.DELETE_COMMENT:
      return state
    default:
    return state
  }
}

export default comments
