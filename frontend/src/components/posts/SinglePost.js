import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { format } from "date-fns";
import VoteScore from "../VoteScore";
import { fetchCommentsByPostId, removePost } from '../../actions'

class SinglePost extends Component {

  componentDidMount() {
    const { post, fetchCommentsByPostId } = this.props
    fetchCommentsByPostId(post.id)
  }

  onRemovePost() {
    const { post, removePost, history } = this.props
    removePost(post.id)
    history.push(`/`)
  }

  render() {
    const { post, view } = this.props;

    return (
      <div className="post-list-item">
        <div className="post-list-item-title">{post.title}</div>
        <div className="post-list-item-comments">
          Comments: {post.commentCount}
        </div>
        <VoteScore type="posts" data={post} />
        <div className="post-list-item-body">{post.body}</div>
        <div>
          <span className="post-list-item-category">{post.category}</span>
        </div>
        <div className="post-list-item-when-by">
          Posted {format(new Date(post.timestamp), "YYYY-MM-DD HH:mm:ss")} by{" "}
          {post.author}
        </div>
        <div className="post-list-item-footer">
          {view && (
            <Link to={`/${post.category}/${post.id}`}>
              <button>View</button>
            </Link>
          )}
          <Link to={`/posts/${post.id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => this.onRemovePost(post.id)}>Delete</button>
        </div>
      </div>
    );
  }
}

export default connect(null, { fetchCommentsByPostId, removePost })(SinglePost);
