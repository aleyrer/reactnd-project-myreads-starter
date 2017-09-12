import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    bookshelfs: PropTypes.array.isRequired,
    bookData: PropTypes.object.isRequired
  }

  updateBook = (event) => {
    this.props.bookData.shelf = event.target.value;
    this.props.onUpdateBook(this.props.bookData);
  }

  render() {

    const { bookshelfs, bookData } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{backgroundImage: "url("+bookData.imageLinks.thumbnail+")"}}></div>
          <div className="book-shelf-changer">
            <select
              defaultValue={bookData.shelf}
              onChange={this.updateBook}>
              <option value="none" disabled>Move to...</option>
              {bookshelfs.map((bookshelf, index)=> (
                <option key={index} value={bookshelf.identifier}>{bookshelf.title}</option>
              ))}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{bookData.title}</div>
        <div className="book-authors">{bookData.authors.join(", ")}</div>
      </div>
    )
  }

}

export default Book
