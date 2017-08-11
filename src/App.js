import React from 'react'
import { Route } from 'react-router-dom'
import BookSearch from './BookSearch'
import MyShelves from './MyShelves'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books : []

  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  changeBookShelf(bk, newShelf) {
    BooksAPI.update(bk, newShelf).then((books) => {
      console.log(books);
      BooksAPI.getAll().then((books) => {
        this.setState({books})
      })
    })
  }
  
  render() {
    return (
      <div>
        <Route exact path="/search" render={({ history }) => (
          <BookSearch booksShelf={this.state.books}
            onShelfChange={(book, newShelf) => {
              this.changeBookShelf(book, newShelf)
              history.push('/')
            }}
          />
        )}/>
        <Route exact path="/" render={() => (
          <MyShelves books={this.state.books}
            onShelfChange={(book, newShelf) => {
              this.changeBookShelf(book, newShelf)
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
