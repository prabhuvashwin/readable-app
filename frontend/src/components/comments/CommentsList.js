import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePost } from "../../actions";
import Comment from "./Comment";
import EditComment from "./EditComment";
import { sortByScore } from '../../utils/helpers'
import './styles.css'

class CommentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canAddComment: false
    };
  }

  render() {
    const { postId, comments } = this.props
    const { canAddComment } = this.state
    let cmts = comments[postId] ? comments[postId].sort((a, b) => sortByScore(b, a)) : {}

    if (cmts.length > 0) {
      return (
        <div className="comments">
          <h2>Comments</h2>
          <div className="comments-list">
            {cmts.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
          <br />
          {!canAddComment
            ? (<button onClick={() => this.setState({ canAddComment: true })}>Add Comment</button>)
            : (<EditComment
                  newComment={true}
                  cancel={(event) => {
                    event.preventDefault();
                    this.setState({ canAddComment: false });
                  }}
                  update={() => {
                    this.setState({ canAddComment: false });
                  }}
                  parentId={postId} />)}
        </div>
      )
    } else {
      return (
        <div className="comments">
          <h2>No comments found</h2>
          <br />
          {!canAddComment
            ? (<button onClick={() => this.setState({ canAddComment: true })}>Add Comment</button>)
            : (<EditComment
                  newComment={true}
                  cancel={(event) => {
                    event.preventDefault();
                    this.setState({ canAddComment: false });
                  }}
                  update={() => {
                    this.setState({ canAddComment: false });
                  }}
                  parentId={postId} />)}
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  console.log("commentslist: " + state.comments)
  return { comments: state.comments };
}

export default connect(mapStateToProps, { updatePost })(
  CommentsList
);
