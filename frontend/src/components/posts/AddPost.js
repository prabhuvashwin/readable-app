import React, { Component } from "react";
import EditPost from "./EditPost";
import { Link } from "react-router-dom";

class AddPost extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <h2>Create a New Post</h2>
        <EditPost newPost={true} history={this.props.history} />
      </div>
    );
  }
}

export default AddPost;
