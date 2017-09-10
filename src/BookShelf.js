import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    bookshelfs: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }


  render() {

    const { title, books, bookshelfs, onUpdateBook } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, index) => (
                <li key={index}>
                  <Book
                    key={book.id}
                    bookData={book}
                    bookshelfs={bookshelfs}
                    onUpdateBook={onUpdateBook}/>
                </li>
              ))}
          </ol>
        </div>
      </div>

    )
  }

}

export default BookShelf
