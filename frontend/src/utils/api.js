import { randomId } from "./helpers"

export const baseUrl = "http://localhost:3001"
export const headers = {
  "Authorization": "whatever-you-want"
}

export const fetchAllCategories = () => {
  return fetch(`${baseUrl}/categories`, {
      headers
    }).then(res => res.json())
}

export const fetchAllPosts = () => {
  return fetch(`${baseUrl}/posts`, {
    headers
  }).then(res => res.json())
}

export const fetchPost = (postId) => {
  return fetch(`${baseUrl}/posts/${postId}`, {
    headers
  }).then(res => res.json())
}

export const addPost = (post) => {
  const newPost = {
    ...post,
    id: randomId(),
    timestamp: Date.now()
  }
  return fetch(`${baseUrl}/posts`, {
    method: "post",
    body: JSON.stringify(newPost),
    headers
  }).then(res => res.json())
}

export const updatePost = (post) => {
  return fetch(`${baseUrl}/posts/${post.id}`, {
    method: "put",
    body: JSON.stringify({ title: post.title, body: post.body }),
    headers
  }).then(res => res.json())
}

export const removePost = (postId) => {
  return fetch(`${baseUrl}/posts/${postId}`, {
    method: "delete",
    headers
  }).then(res => res.json())
}

export const fetchCommentsByPostId = (postId) => {
  return fetch(`${baseUrl}/posts/${postId}/comments`, {
    headers
  }).then(res => res.json())
}

export const addComment = (comment) => {
  return fetch(`${baseUrl}/comments`, {
    method: "post",
    body: JSON.stringify(comment),
    headers
  }).then(res => res.json())
}

export const updateComment = (comment) => {
  return fetch(`${baseUrl}/comments/${comment.id}`, {
    method: "put",
    body: JSON.stringify({ body: comment.body, author: comment.author }),
    headers
  }).then(res => res.json())
}

export const removeComment = (comment) => {
  return fetch(`${baseUrl}/comments/${comment.id}`, {
    method: "delete",
    headers
  }).then(res => res.json())
}

export const voteScore = (option, type, data) => {
  return fetch(`${baseUrl}/${type}/${data.id}`, {
    method: "put",
    body: JSON.stringify({ option: option }),
    headers
  }).then(res => res.json())
}
