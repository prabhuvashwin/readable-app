import _ from 'lodash'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllPosts, updatePost, fetchCommentsByPostId } from '../actions'

class EditPost extends Component {
  componentDidMount() {
    this.props.fetchAllPosts()
    this.props.fetchCommentsByPostId(this.props.match.params.postId)
  }

  updatePost = (e) => {
    e.preventDefault()

    if (e.target.body.value === "" || e.target.title.value === "") {
      alert("Please enter post title and body. Both fields are mandatory")
    } else {
      this.props.updatePost(this.props.post.id, e.target.title.value, e.target.body.value,
        () => this.props.history.push('/'))
    }
  }

  render() {
    const { post } = this.props

    return (
      <form onSubmit={this.updatePost}>
        <div className="new-post">
          <h2>Edit Post</h2>
          <input
            defaultValue={post.title}
            type="text"
            name="title"
            className="field-long"
            placeholder="Enter post title here (required):" />
          <textarea
            defaultValue={post.body}
            name="body"
            className="field-long field-textarea"
            placeholder="Enter post body here (required):">
          </textarea>
          <div>
            <button onClick={() => this.editPost}>Update</button>
            <button>
              <Link to={`/post/${post.id}`}>
                Cancel
              </Link>
            </button>
          </div>
        </div>
      </form>
    )
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  return {
    post: _.find(posts, { id: match.params.postId }),
    comments: comments[match.params.postId]
  }
}

export default connect(mapStateToProps, { fetchAllPosts, updatePost, fetchCommentsByPostId })(EditPost)
