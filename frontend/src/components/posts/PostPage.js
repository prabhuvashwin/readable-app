import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost, removePost } from "../../actions";
import CommentsList from "../comments/CommentsList";
import { Link } from "react-router-dom";
import SinglePost from "./SinglePost";

class PostPage extends Component {

  componentDidMount() {
    const { postId } = this.props.match.params
    this.props.fetchPost(postId)
  }

  render() {
    const { postId } = this.props.match.params
    const { posts } = this.props
    const post = posts ? posts.filter(post => post.id === postId)[0] : {}

    if (post) {
      return (
        <div>
          <Link to="/">Home</Link>
          <span> > </span>
          <Link to={`/category/${post.category}`}>{post.category}</Link>
          <br />
          <br />
          <SinglePost post={post} />
          <CommentsList postId={postId} />
        </div>
      )
    }

    return (<div>Post not found</div>)
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps,
  { fetchPost, removePost })(PostPage);
