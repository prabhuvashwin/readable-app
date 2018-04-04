import * as Types from "./types";
import * as API from "../utils/api"

export const fetchCategories = () => {
  return (dispatch) => {
    API.fetchAllCategories()
      .then(data => dispatch({
        type: Types.FETCH_CATEGORIES,
        categories: data.categories
      })
    )
  }
}

export const fetchPosts = () => {
  return (dispatch) => {
    API.fetchAllPosts()
      .then(posts => dispatch({
        type: Types.FETCH_POSTS,
        posts
      })
    )
  }
}

export const fetchPost = postId => {
  return (dispatch) => {
    API.fetchPost(postId)
      .then(post => dispatch({
        type: Types.FETCH_POST,
        post
      })
    )
  }
}

export const addPost = (post) => {
  return (dispatch) => {
    API.addPost(post)
      .then(post => dispatch({
        type: Types.ADD_POST,
        post
      }))
  }
}

export const updatePost = post => {
  return (dispatch) => {
    API.updatePost(post)
      .then(post => dispatch({
        type: Types.UPDATE_POST,
        post
      })
    )
  }
}

export const removePost = postId => {
  return (dispatch) => {
    API.removePost(postId)
      .then(json => dispatch({
        type: Types.REMOVE_POST,
        postId
      })
    )
  }
}

export const fetchCommentsByPostId = postId => {
  return (dispatch) => {
    API.fetchCommentsByPostId(postId)
      .then(comments => dispatch({
        type: Types.FETCH_COMMENT_BY_POST_ID,
        postId,
        comments
      })
    )
  }
}

export const addComment = comment => {
  return (dispatch) => {
    API.addComment(comment)
      .then(comment => dispatch({
        type: Types.UPDATE_COMMENT,
        comment
      })
    )
  }
}

export const updateComment = comment => {
  return (dispatch) => {
    API.updateComment(comment)
      .then(comment => dispatch({
        type: Types.UPDATE_COMMENT,
        comment
      })
    )
  }
}

export const removeComment = comment => {
  return (dispatch) => {
    API.removeComment(comment)
      .then(comment => dispatch({
        type: Types.REMOVE_COMMENT,
        comment
      })
    )
  }
}

export const voteScore = (option, type, data) => disptach => {
  return (dispatch) => {
    API.voteScore(option, type, data)
      .then(data => {
        switch (type) {
          case "posts":
            updatePost(data)
            break
          case "comments":
            updateComment(data)
            break
          default:
            break
        }
      }
    )
  }
}
