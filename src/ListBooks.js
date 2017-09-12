import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class ListBooks extends Component {

  static propTypes = {
    bookshelfs: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  render() {

    const {
      bookshelfs,
      books,
      updateBook
    } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          {bookshelfs.map((bookshelf, index)=>(
            <BookShelf
              key={bookshelf.identifier}
              title={bookshelf.title}
              books={books.filter((book) => book.shelf === bookshelf.identifier)}
              bookshelfs={bookshelfs}
              onUpdateBook={updateBook}
            />
          ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/create">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;
