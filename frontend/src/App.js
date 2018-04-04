import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"
import CategoriesMain from './components/categories/CategoriesMain'
import EditPostPage from './components/posts/EditPostPage'
import AddPost from './components/posts/AddPost'
import PostPage from './components/posts/PostPage'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header>
          <h1>Readable</h1>
        </header>
        <Switch>
          <Route exact path="/" component={CategoriesMain} />
          <Route path="/posts/:postId/edit" component={EditPostPage} />
          <Route path="/posts/add" component={AddPost} />
          <Route path="/:category/:postId" component={PostPage} />
          <Route path="/:category" component={CategoriesMain} />
        </Switch>
      </div>
    );
  }
}

export default App;
