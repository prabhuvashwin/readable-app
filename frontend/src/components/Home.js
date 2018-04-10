import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import PostInfo from './PostInfo'
import { connect } from 'react-redux'
import { fetchAllPosts, sortPost } from '../actions'

class Home extends Component {

  componentDidMount() {
    this.props.fetchAllPosts()
  }

  render() {
    const { posts, categories } = this.props
    return (
      <div className="home">
        <div className="categories-list">
          <div className="categories-menu">
            <div className="categories-heading">Categories</div>
            <ul>
              <NavLink exact activeClassName="link-active" to="/">
                <li>All</li>
              </NavLink>
              {categories &&
                categories.map(category => (
                  <NavLink
                    exact
                    to={`/${category.path}`}
                    activeClassName="link-active"
                    key={category.path}>
                    <li>{category.name}</li>
                  </NavLink>
                ))}
            </ul>
          </div>
        </div>

        <div className="post-section">
          <div className="post-option">
            <div className="sort-option">
              <p>Sort By:   </p>
              <button onClick={() => sortPost("timestamp")}>Time</button>
              <button onClick={() => sortPost("voteScore")}>Vote Score</button>
              <button>
                <Link to="/new">
                  New Post
                </Link>
              </button>
            </div>
            <div>
              {posts.map(post => (
                <PostInfo key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>

    )
  }
}

function mapStateToProps({ categories, posts }, { match }) {
  const category = match.params.category
  return {
    posts: category ? posts.filter(post => post.category === category) : posts,
    categories
  }
}

export default connect(mapStateToProps, { fetchAllPosts })(Home)
