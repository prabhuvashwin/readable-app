import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePost, updateComment, voteScore } from "../actions";

class VoteScore extends Component {

  render() {
    const { type, data } = this.props;
    return (
      <div className="score">
        <span>
          <strong>Score</strong> {data.voteScore}{" "}
        </span>
        <button onClick={() => voteScore("upVote", type, data)}>+</button>
        <button onClick={() => voteScore("downVote", type, data)}>-</button>
      </div>
    );
  }
}

export default connect(null, { updatePost, updateComment })(VoteScore);
