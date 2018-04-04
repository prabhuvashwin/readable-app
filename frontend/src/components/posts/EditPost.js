import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost, addPost, updatePost } from "../../actions";
import { randomId } from "../../utils/helpers";

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      timestamp: "",
      title: "",
      body: "",
      author: "",
      category: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.newPost) {
      this.props.fetchPost(this.props.postId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.newPost) {
      const { postId } = this.props
      const { posts } = nextProps

      if (posts) {
        const currentPost = posts.filter(post => post.id === postId)[0]

        this.setState({
          id: currentPost.id,
          timestamp: currentPost.timestamp,
          title: currentPost.title,
          body: currentPost.body,
          author: currentPost.author,
          category: currentPost.category
        });
      }
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ ...this.state, [name]: value });
  }

  submit(event) {
    event.preventDefault();
    const { id, timestamp, title, body, author, category } = this.state;
    if (this.props.newPost) {
      this.props.addPost({ id, timestamp, title, body, author, category });
    } else {
      this.props.updatePost({ id, timestamp, title, body, author, category });
    }
  }

  render() {
    const { id, timestamp, title, body, author, category } = this.state;
    const { newPost } = this.props
    return (
      <form onSubmit={event => this.submit(event)}>
        <input type="hidden" value={id} />
        <label>
          Title<br />
          <input
            name="title"
            type="text"
            value={title}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Body<br />
          <textarea
            value={body}
            name="body"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Author<br />
          <input
            name="author"
            type="text"
            disabled={!newPost}
            value={author}
            onChange={this.handleInputChange} />
        </label>
        <br />
        Category<br />
        <select
          name="category"
          value={category}
          disabled={!newPost}
          onChange={this.handleInputChange}>
          <option value="" disabled>Select Category</option>
          <option value="react">React</option>
          <option value="redux">Redux</option>
          <option value="udacity">Udacity</option>
        </select>
        <br />
        {newPost ? (<button type="submit">Submit</button>)
          : (<button type="submit">Update</button>)}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPost, addPost, updatePost })(EditPost);
