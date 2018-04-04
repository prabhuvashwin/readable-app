import React, { Component } from "react";
import EditComment from "./EditComment";
import { connect } from "react-redux";
import { removeComment } from "../../actions";
import { format } from "date-fns";
import VoteScore from "../VoteScore";
import './styles.css'

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }

  render() {
    const { comment, removeComment } = this.props

    if (this.state.edit) {
      return (
        <EditComment
          comment={comment}
          update={(comment) => {
            this.setState({ edit: false, comment: comment });
          }}
          cancel={(event) => {
            event.preventDefault()
            this.setState({ edit: false })
          }}
        />
      );
    }

    return (
      <div className="comment">
        <h3>Comment</h3>
        <VoteScore type="comments" data={comment} />
        <div className="comment-body">{comment.body}</div>
        <div className="comment-when-by">
          Posted {format(new Date(comment.timestamp), "YYYY-MM-DD HH:mm:ss")} by{" "}
          {comment.author}
        </div>
        <div className="comment-footer">
          <button onClick={() => this.setState({ edit: true })}>Edit</button>
          <button onClick={() => removeComment(comment)}>Delete</button>
        </div>
      </div>
    );
  }
}

export default connect(null, { removeComment })(Comment);
