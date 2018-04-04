import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListCategories from './ListCategories'
import ListPosts from '../posts/ListPosts'
import { fetchCategories, fetchPosts } from '../../actions'
import './styles.css'

class CategoriesMain extends Component {

  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchPosts()
  }

  render() {
    const { match } = this.props

    return (
      <div className="main-categories">
        <ListCategories category={match.params.category ? match.params.category : 'all'} />
        <ListPosts category={match.params.category ? match.params.category : 'all'} />
      </div>
    )
  }
}

export default connect(
  null,
  { fetchCategories, fetchPosts }
)(CategoriesMain);
