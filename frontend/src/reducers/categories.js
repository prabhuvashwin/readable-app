import * as Types from '../actions/types'

function categories(state=[], action) {
  switch(action.type) {
    case Types.FETCH_ALL_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

export default categories
