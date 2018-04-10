import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTimestamp } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { fetchAllPosts, votePost, deletePost, fetchCommentsByPostId } from '../actions'
import DisplayComments from './DisplayComments'
import '../App.css'

class DisplayAllPostInfo extends Component {

  componentDidMount() {
    this.props.fetchAllPosts()
    this.props.fetchCommentsByPostId(this.props.match.params.postId)
  }

  render() {
    const { post, comments, votePost, fetchAllPosts, deletePost, history } = this.props
    if(!post) {
      return (
        <div>
          <h1>404 Post Not Found</h1>
        </div>
      )
    }
    return (
      <div>
        <div className="post-options">
          <p>Edit Post Options:   </p>
          <button>
            <Link to={`/${post.category}/${post.id}/edit`}>
              Edit
            </Link>
          </button>
          <button>
            <Link to={`/${post.category}/${post.id}/comment`}>
              Add Comment
            </Link>
          </button>
          <button onClick={() => deletePost(post.id, () => { history.push('/') })}>Delete</button>
        </div>
        {post && (
          <div className="post" key={post.id}>
            <div className="post-description">
              <Link to={`/${post.category}/${post.id}`}>
                <h3>{post.title}</h3>
              </Link>
              <p>{post.body}</p>
            </div>
            <div className="post-details">
              <p className="post-info"><b>Category: </b> {post.category}</p>
              <p className="post-info"><b>Author: </b> {post.author}</p>
              <p className="post-info"><b>Time: </b> {formatTimestamp(post.timestamp)}</p>
              <p className="post-info">{post.voteScore} votes {comments && comments ? comments.length : 0} comments</p>
              <div className="voting-buttons">
                <button onClick={() => {
                  votePost(post.id, "upVote")
                  fetchAllPosts()
                }}>+</button>
                <button onClick={() => {
                  votePost(post.id, "downVote")
                  fetchAllPosts()
                }}>-</button>
              </div>
            </div>
          </div>
        )}

        {post && comments && <DisplayComments category={post.category} comments={comments} history={this.props.history} />}
      </div>
    )
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  const post = _.find(posts, { id: match.params.postId })
  return {
    post: post,
    comments: comments[match.params.postId]
  }
}

export default connect(mapStateToProps, { fetchAllPosts, votePost, deletePost, fetchCommentsByPostId })(DisplayAllPostInfo)
