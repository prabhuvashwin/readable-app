import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { formatTimestamp } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { deleteComment, fetchCommentsByPostId, voteComment } from '../actions'
import '../App.css'

class DisplayComments extends Component {

  onDeleteComment = (comment) => {
    this.props.deleteComment(comment.id, () => {
      this.props.fetchCommentsByPostId(comment.parentId)
      this.props.history.push(`/${this.props.category}/${comment.parentId}`)
    })
  }

  render() {
    const { voteComment } = this.props
    return (
      <div>
        {this.props.comments.map(comment => (
          <div className="comment" key={comment.id}>
            <div>
              <p>{comment.body}</p>
              <div className="comment-author">
                <p>Comment by <b>{comment.author}</b> at {formatTimestamp(comment.timestamp)}</p>
              </div>
            </div>
            <div className="comment-options">
              <button>
                <Link to={`/${this.props.category}/${comment.parentId}/${comment.id}/edit`}>
                  Edit
                </Link>
              </button>
              <button onClick={() => this.onDeleteComment(comment)}>Delete</button>
              {comment.voteScore} votes
              <div className="voting-buttons">
                <button onClick={() => {
                  voteComment(comment.id, comment.parentId, "upVote")
                }}>+</button>
                <button onClick={() => {
                  voteComment(comment.id, comment.parentId, "downVote")
                }}>-</button>
              </div>

            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  }
}

export default connect(mapStateToProps, { deleteComment, voteComment, fetchCommentsByPostId })(DisplayComments)
