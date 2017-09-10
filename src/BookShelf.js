import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {

  static propTypes = {
    identifier: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    bookshelfs: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired
  }


  render() {

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book, index) => (
                <li key={index}>
                  <Book key={book.id} bookData={book} bookshelfs={this.props.bookshelfs} />
                </li>
              ))}
          </ol>
        </div>
      </div>

    )
  }

}

export default BookShelf
