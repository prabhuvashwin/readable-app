import sortBy from 'sort-by'
import * as Types from '../actions/types'

function posts(state=[], action) {
  switch(action.type) {
    case Types.FETCH_ALL_POSTS:
      return action.posts.filter(post => !(post.deleted))
    case Types.ADD_POST:
      return [...state, action.post]
    case Types.UPDATE_POST:
      return state.map(post => {
        if(post.id === action.postId) {
          post = action.post
        }
        return post
      })
    case Types.DELETE_POST:
      return state.filter(post => post.id !== action.postId)
    case Types.VOTE_POST:
      return state.map(existingPost => {
        if (action.post.id === existingPost.id) {
          existingPost = action.post
        }
        return existingPost
      })
    // https://www.npmjs.com/package/sort-by
    case Types.SORT_POST:
      return [].concat(state.sort(sortBy("-" + action.sortKey)))
    default:
      return state
  }
}

export default posts
