import React, { Component } from 'react';
import { connect } from 'react-redux'
import { formatTimestamp } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { fetchCommentsByPostId, votePost } from '../actions'
import '../App.css'

class PostInfo extends Component {
  componentDidMount() {
    this.props.fetchCommentsByPostId(this.props.post.id)
  }

  render() {
    const { post, comments, votePost, fetchCommentsByPostId } = this.props

    return (
      <div>
        {post && (
          <div className="post">
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
              <p className="post-info"><b>{post.voteScore} votes {comments && comments ? comments.length : 0} comments</b></p>
              <div className="voting-buttons">
                <button onClick={() => {
                  votePost(post.id, "upVote")
                  fetchCommentsByPostId(post.id)
                }}>+</button>
                <button onClick={() => {
                  votePost(post.id, "downVote")
                  fetchCommentsByPostId(post.id)
                }}>-</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ comments }, { post }) {
  return {
    comments: comments[post.id]
  }
}

export default connect(mapStateToProps, { fetchCommentsByPostId, votePost })(PostInfo)
