import React from "react";
import EditPost from "./EditPost";
import { Link } from "react-router-dom";

function EditPostPage(props) {
  return (
    <div>
      <Link to="/">Home</Link>
      <h2>Edit Post</h2>
      <EditPost postId={props.match.params.postId} history={props.history} />
    </div>
  );
}

export default EditPostPage;
