import React, { Component } from "react";
import { updateComment, addComment } from "../../actions";
import { connect } from "react-redux";
import { randomId } from '../../utils/helpers'
import './styles.css'

class EditComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.newComment ? { body: "", author: "" } : this.props.comment
    };
  }

  componentDidMount() {
    this.setState({ isValid: this.validate(this.props.comment) });
  }

  validate() {
    const { body, author } = this.state.comment;
    return body !== "" && author !== "";
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      ...prevState,
      comment: { ...prevState.comment, [name]: value },
      isValid: this.validate({ ...prevState.comment, [name]: value })
    }));
  };

  submit = event => {
    event.preventDefault();
    const { id, body, author } = this.state.comment;
    const comment = {
      id,
      body,
      author
    };

    if (this.props.newComment) {
      this.props.addComment({
        ...comment,
        id: randomId(),
        timestamp: Date.now(),
        parentId: this.props.parentId
      });
      this.props.update();
    } else {
      this.props.updateComment(comment);
      this.props.update();
    }
  };

  render() {
    const { comment } = this.state;
    return (
      <div className="comment">
        <form onSubmit={event => this.submit(event)}>
          <label>
            Name<br />
            <textarea
              name="body"
              value={comment.body}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Author<br />
            <input
              name="author"
              type="text"
              value={comment.author}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <button type="button" onClick={event => this.props.cancel(event)}>
            Cancel
          </button>
          {this.props.newComment ? (
            <button disabled={!this.validate()} type="submit">
              Submit
            </button>
          ) : (
            <button disabled={!this.validate()} type="submit">
              Update
            </button>
          )}
        </form>
      </div>
    );
  }
}

export default connect(null, { updateComment, addComment })(EditComment);
