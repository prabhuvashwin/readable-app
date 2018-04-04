import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './styles.css'

class ListCategories extends Component {

  render() {
    const { categories } = this.props

    return (
      <div className="categories-list">
        <div className="categories-heading">
        </div>
        <ul>
          <NavLink exact activeClassName="link-active" to="/">
            <li>All</li>
          </NavLink>
          {categories &&
            categories.map(category => (
              <NavLink exact
                to={`/${category.path}`}
                activeClassName="link-active"
                key={category.path}>
                <li>{category.name}</li>
              </NavLink>
            ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

export default connect(
  mapStateToProps
)(ListCategories)
