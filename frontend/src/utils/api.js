export const baseUrl = 'http://localhost:3001'

export const headers = {
  'Accept': 'application/json',
  'Authorization': 'None',
  'Content-Type': 'application/json'
}

export const fetchAllCategories = () => {
  return fetch(`${baseUrl}/categories`, {
    headers
  }).then(response => response.json())
}

export const fetchAllPosts = () => {
  return fetch(`${baseUrl}/posts`, {
    headers
  }).then(response => response.json())
}

export const addPost = (post) => {
  return fetch(`${baseUrl}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers
  })
}

export const updatePost = (postId, title, body) => {
  return fetch(`${baseUrl}/posts/${postId}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      title,
      body
    })
  }).then(response => response.json())
}

export const deletePost = (postId) => {
  return fetch(`${baseUrl}/posts/${postId}`, {
    method: 'DELETE',
    headers: headers
  }).then(response => response.json())
}

export const votePost = (postId, option) => {
  return fetch(`${baseUrl}/posts/${postId}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ option })
  }).then(response => response.json())
}

export const fetchCommentsByPostId = (postId) => {
  return fetch(`${baseUrl}/posts/${postId}/comments`, {
    headers
  }).then(response => response.json())
}

export const addComment = (comment) => {
  return fetch(`${baseUrl}/comments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(comment)
  }).then(response => response.json())
}

export const deleteComment = (commentId) => {
  return fetch(`${baseUrl}/comments/${commentId}`, {
    method: 'DELETE',
    headers
  }).then(response => response.json())
}

export const voteComment = (commentId, option) => {
  return fetch(`${baseUrl}/comments/${commentId}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ option })
  }).then(response => response.json())
}

export const updateComment = (commentId, timestamp, body) => {
  return fetch(`${baseUrl}/comments/${commentId}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({ timestamp, body })
  }).then(response => response.json())
}
