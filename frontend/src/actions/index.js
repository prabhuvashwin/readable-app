import * as Types from "./types";
import * as API from "../utils/api"

export const fetchAllCategories = () => {
  return (dispatch) => {
    API.fetchAllCategories()
      .then(response => dispatch({
        type: Types.FETCH_ALL_CATEGORIES,
        categories: response.categories
      }))
  }
}

export const fetchAllPosts = () => {
  return (dispatch) => {
    API.fetchAllPosts()
      .then(posts => dispatch({
        type: Types.FETCH_ALL_POSTS,
        posts
      }))
  }
}

export const fetchPostsByCategory = (category) => {
  return (dispatch) => {
    API.fetchPostsByCategory(category)
      .then(posts => dispatch({
        type: Types.FETCH_POSTS_BY_CATEGORY,
        posts
      }))
  }
}

export const addPost = (post, callback) => {
  return (dispatch) => {
    API.addPost(post)
      .then(() => dispatch({
        type: Types.ADD_POST,
        post
      }))
      .then(() => callback())
  }
}

export const updatePost = (postId, title, body, callback) => {
  return (dispatch) => {
    API.updatePost(postId, title, body)
      .then(updatedPost => dispatch({
          type: Types.UPDATE_POST,
          updatedPost,
          postId
      }))
      .then(() => callback())
  }
}

export const deletePost = (postId, callback) => {
  return (dispatch) => {
    API.deletePost(postId)
      .then(() => dispatch({
        type: Types.DELETE_POST, postId
      }))
      .then(() => callback())
  }
}

export const votePost = (postId, option) => {
  return (dispatch) => {
    API.votePost(postId, option)
      .then(post => dispatch({
        type: Types.VOTE_POST,
        postId,
        option
      }))
  }
}

export const sortPost = (sortKey) => {
  return (dispatch) => {
    dispatch({
      type: Types.SORT_POST, sortKey
    })
  }
}

export const fetchCommentsByPostId = (postId) => {
  return (dispatch) => {
    API.fetchCommentsByPostId(postId)
      .then(comments => dispatch({
        type: Types.FETCH_COMMENTS,
        postId,
        comments
      }))
  }
}

export const addComment = (comment, postId, callback) => {
  return (dispatch) => {
    API.addComment(comment)
      .then(comment => dispatch({
        type: Types.ADD_COMMENT,
        postId,
        comment
      }))
      .then(() => callback())
  }
}

export const deleteComment = (commentId, callback) => {
  return (dispatch) => {
    API.deleteComment(commentId)
      .then(() => dispatch({
        type: Types.DELETE_COMMENT,
        commentId
      }))
      .then(() => callback())

  }
}

export const voteComment = (commentId, postId, option) => {
  return (dispatch) => {
    API.voteComment(commentId, option)
      .then(updatedComment => dispatch({
        type: Types.VOTE_COMMENT,
        updatedComment,
        commentId,
        postId
      }))
  }
}

export const updateComment = (commentId, postId, timestamp, body, callback) => {
  return (dispatch) => {
    API.updateComment(commentId, timestamp, body)
      .then(updatedComment => dispatch({
        type: Types.UPDATE_COMMENT,
        updatedComment,
        commentId,
        postId
      }))
      .then(() => callback())
  }
}
