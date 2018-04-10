import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addComment } from '../actions'
import { guid } from '../utils/helpers'

class NewComment extends Component {

  submitNewComment = (e) => {
    e.preventDefault()

    if (e.target.body.value === "" || e.target.author.value === "") {
      alert("Please enter author name and comment. Both fields are mandatory");
    } else {
      const comment = {
        id: guid(),
        parentId: this.props.match.params.postId,
        timestamp: Date.now(),
        body: e.target.body.value,
        author: e.target.author.value
      }
      this.props.addComment(comment, this.props.match.params.postId,
        () => alert(`Comment with id: ${comment.id} added`))
    }
  }

  render() {
    const post = _.find(this.props.posts, { id: this.props.match.params.postId })
    return (
      <form onSubmit={this.submitNewComment}>
        <div className="new-comment">
          <h2>New Comment</h2>
          <input
            type="text"
            name="author"
            className="field-long"
            placeholder="Enter author name (required):" />
          <textarea
            name="body"
            className="field-long field-textarea"
            placeholder="Enter comment body (required):">
          </textarea>
          <div>
            <button>Submit</button>
            <Link to={`/${post.category}/${this.props.match.params.postId}`}>
              <button>Back</button>
            </Link>
          </div>
        </div>
      </form>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  }
}

export default connect(mapStateToProps, { addComment })(NewComment)
