import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {

  state = {
    query : '',
    data: []
  }


  updateQuery = (query) => {
    BooksAPI.search(query, 5).then((books) => {
      console.log( `BOOKS ${books}`);
      this.setState({data:books})
    })
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {

    this.setState({ query: '' })
  }


  render(){
    let query = this.state.query
    let showingBooks = this.state.data
    
    if (!(showingBooks instanceof Array)){
      showingBooks = []
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
            {showingBooks && (
              <ol className="books-grid">
                  {showingBooks.map((book) => (
                    <li key={book.id} className='book-list-item'>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          <div className="book-shelf-changer">
                            <select>
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
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default BookSearch
