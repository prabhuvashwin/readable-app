import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SinglePost from './SinglePost'
import { fetchPosts } from '../../actions'
import { sortByScore, sortByDate, toTitleCase } from '../../utils/helpers'
import './styles.css'

class ListPosts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortBy: "SCORE_DESC"
    }
  }

  sortBy = (post1, post2) => {
    const { sortBy } = this.state

    switch (sortBy) {
      case 'SCORE_DESC':
        return sortByScore(post2, post1)
      case 'SCORE_ASC':
        return sortByScore(post1, post2)
      case 'DATE_DESC':
        return sortByDate(post2, post1)
      case 'DATE_ASC':
      default:
        return sortByDate(post1, post2)
    }
  }

  getPosts() {
    const { posts, category } = this.props
    if (!posts) {
      return false
    }
    if (category === 'all') {
      return posts.sort(this.sortBy)
    }

    return posts.filter(post => post.category === category).sort(this.sortBy)
  }

  render() {
    const posts = this.getPosts()
    const { category, removePost } = this.props

    return (
      <div className="post-list">
        <h2>{toTitleCase(this.props.category)} Posts</h2>
        <div className="post-list-actions">
          <span className="sort-item">
            <span className="sort-label">Score</span>
            <button
              className={`sort-button ${
                this.state.sortBy === "SCORE_ASC" ? "sort-button-current" : ""
              }`}
              onClick={() => this.setState({ sortBy: "SCORE_ASC" })}>
              Low - High
            </button>
            <button
              className={`sort-button ${
                this.state.sortBy === "SCORE_DESC" ? "sort-button-current" : ""
              }`}
              onClick={() => this.setState({ sortBy: "SCORE_DESC" })}>
              High - Low
            </button>
          </span>
          <span className="sort-item">
            <span className="sort-label">Date</span>
            <button
              className={`sort-button ${
                this.state.sortBy === "DATE_ASC" ? "sort-button-current" : ""
              }`}
              onClick={() => this.setState({ sortBy: "DATE_ASC" })}>
              Old - New
            </button>
            <button
              className={`sort-button ${
                this.state.sortBy === "DATE_DESC" ? "sort-button-current" : ""
              }`}
              onClick={() => this.setState({ sortBy: "DATE_DESC" })}>
              New - Old
            </button>
          </span>
          <Link to="/posts/add">
            <button>New</button>
          </Link>
        </div>
        {posts.length > 0 ? (
          posts.map(post => (
            <SinglePost
              key={post.id}
              post={post}
              view={true} />
          ))) : (
          <div>No posts in {category}</div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(ListPosts);
