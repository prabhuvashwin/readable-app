import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import { guid } from '../utils/helpers'

class NewPost extends Component {

  getNewPost = (e) => {
    e.preventDefault()

    const submitPost = {
      id: guid(),
      timestamp: Date.now(),
      title: e.target.title.value,
      body: e.target.body.value,
      author: e.target.author.value,
      category: e.target.category.value,
    }
    this.props.addPost(submitPost, () => this.props.history.push('/'))
  }

  render() {
    const { categories } = this.props
    return (
      <form onSubmit={this.getNewPost}>
        <div className="new-post">
          <h2>New Post</h2>
          <input type="text" name="author" className="field-long" placeholder="Enter post name here (required):" />
          <input type="text" name="title" className="field-long" placeholder="Enter post title here (required):" />
          <select name="category" className="field-select">
            <option key="1" value="None">Select Category</option>
            {categories && categories.map((category) => (
              <option key={category.name} value={category.name}>{category.name}</option>
            ))}
          </select>
          <textarea name="body" className="field-long field-textarea" placeholder="Enter post body here (required):"></textarea>
          <div>
            <button>Submit</button>
            <Link to={"/"}>
              <button>Cancel</button>
            </Link>
          </div>
        </div>
      </form>
    )
  }
}

function mapStateToProps({ posts, categories }) {
  return {
    posts,
    categories
  }
}

export default connect(mapStateToProps, { addPost })(NewPost)
