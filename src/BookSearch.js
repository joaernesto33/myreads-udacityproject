import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {

  state = {
    query : '',
    data: []
  }


  updateQuery = (query) => {
    if ( query !== ''){
      BooksAPI.search(query, 20).then((books) => {
        this.setState({data:books})
      })
    } else{
      this.setState({data:[]})
    }
    this.setState({ query: query.trim() })
  }


  handleBookMove = (book, valueShelf) => {
      this.props.onShelfChange(book, valueShelf)
  }


  render(){
    let query = this.state.query
    let searchBooks = []
    let shelfBooks = this.props.booksShelf

    if (this.state.data !== undefined && this.state.data.length>0) {
      searchBooks = this.state.data

      searchBooks.forEach( book => book.shelf = 'none')

      searchBooks.forEach( book => {
        shelfBooks.forEach( shelfbook => {
          if (book.id === shelfbook.id)
            book.shelf = shelfbook.shelf
        })
      })
    } else {
      searchBooks = []
    }

    return(
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                value={query}
                placeholder="Search by title or author"
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {searchBooks.map((book) => (
                  <li key={book.id} className='book-list-item' onChange={(event) => this.handleBookMove(book, event.target.value)}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select defaultValue={book.shelf}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default BookSearch
