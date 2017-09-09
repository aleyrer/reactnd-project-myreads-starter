import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {

  static propTypes = {
    key: PropTypes.string.required,
    title: PropTypes.string.required,
    bookshelfs: PropTypes.array.required
  }


  render() {

      const tempTestBook = {
        title: "To Kill a Mockingbird",
        authors: "Harper Lee",
        coverWidth: 128,
        coverHeight: 193,
        coverImageUrl: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
        bookshelfs: this.props.bookshelfs
      }

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <li>
              <Book
                title={tempTestBook.title}
                authors={tempTestBook.authors}
                coverWidth={tempTestBook.coverWidth}
                coverHeight={tempTestBook.coverHeight}
                coverImageUrl={tempTestBook.coverImageUrl}
                bookshelfs={tempTestBook.bookshelfs}
              />
            </li>
          </ol>
        </div>
      </div>

    )
  }

}

export default BookShelf
