import * as Types from "../actions/types";

export default function(state = { posts: [], comments: {} }, action) {
  switch (action.type) {
    case Types.FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    case Types.FETCH_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    case Types.FETCH_POST:
    case Types.UPDATE_POST:
      return {
        ...state,
        posts: [
          ...state.posts.filter(post => post.id !== action.post.id),
          action.post
        ]
      }
    case Types.ADD_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          action.post
        ]
      }
    case Types.REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId)
      }
    case Types.FETCH_COMMENT_BY_POST_ID:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.postId]: action.comments
        }
      }
    case Types.UPDATE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.parentId]: state.comments[action.comment.parentId]
            ? [
                ...state.comments[action.comment.parentId].filter(
                  comment => comment.id !== action.comment.id
                ),
                action.comment
              ]
            : []
        }
      }
    case Types.REMOVE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.parentId]: state.comments[
            action.comment.parentId
          ].filter(comment => comment.id !== action.comment.id)
        }
      };
    default:
      return state;
  }
}
