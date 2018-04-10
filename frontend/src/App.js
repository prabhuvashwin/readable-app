import React, { Component } from 'react'
import { Link, Route, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAllCategories } from './actions'
import NewPost from './components/NewPost'
import NewComment from './components/NewComment'
import EditComment from './components/EditComment'
import EditPost from './components/EditPost'
import Home from './components/Home'
import DisplayAllPostInfo from './components/DisplayAllPostInfo'
import DisplayComments from './components/DisplayComments'
import './App.css'

class App extends Component {

  componentDidMount() {
    this.props.fetchAllCategories()
  }

  render() {

    return (
      <div className="App">
        <div className="app-heading">
          <Link to="/">
            <p>Readable</p>
          </Link>
        </div>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/new" component={NewPost} />
          <Route exact path="/:category" component={Home} />
          <Route exact path="/:category/:postId" component={DisplayAllPostInfo} />
          <Route path="/:category/:postId/edit" component={EditPost} />
          <Route path="/:category/:postId/comment" component={NewComment} />
          <Route path="/:category/:postId/:commentId/edit" component={EditComment} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(null, { fetchAllCategories })(App))
