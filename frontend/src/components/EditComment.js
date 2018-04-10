import _ from 'lodash'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCommentsByPostId, updateComment } from '../actions'

class EditComment extends Component {

  componentDidMount() {
    this.props.fetchCommentsByPostId(this.props.match.params.postId)
  }

  updateComment = () => {
    e.preventDefault()

    if (body === "") {
      alert('Comment is a mandatory field and cannot be empty')
    } else {
      this.props.updateComment(this.props.comment.id,
        this.props.comment.parentId, Date.now(), e.target.body.value,
        () => this.props.history.push(`/post/${postId}`))
    }
  }

  render() {
    return (
      <form onSubmit={this.updateComment}>
        <div className="new-comment">
          <h2>Edit Comment</h2>
          <textarea
            defaultValue={this.props.comment.body}
            name="body"
            className="field-long field-textarea"
            placeholder="Enter comment here (required):">
          </textarea>
          <div>
            <button onClick={() => this.updateComment}>Update</button>
            <Link to={`/post/${this.props.comment.parentId}`}>
              <button>Cancel</button>
            </Link>
          </div>
        </div>
      </form>
    )
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  return {
    comment: _.find(comments[match.params.postId], { id: match.params.commentId })
  }
}

export default connect(mapStateToProps, { fetchCommentsByPostId, updateComment })(EditComment)
