import React from 'react'
import { Route } from 'react-router-dom'
import BookSearch from './BookSearch'
import MyShelves from './MyShelves'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    //books : []
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }



  render() {
    return (
      <div>
        <Route exact path="/search" render={() => (
          <BookSearch />
        )}/>
        <Route exact path="/" render={() => (
          <MyShelves />
        )}/>
      </div>
    )
  }
}

export default BooksApp
