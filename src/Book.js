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

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 140, height: 200, backgroundRepeat: "no-repeat", backgroundImage: "url("+this.props.bookData.imageLinks.thumbnail+")" }}></div>
          <div className="book-shelf-changer">
            <select
              defaultValue={this.props.bookData.shelf}
              onChange={this.updateBook}>
              <option value="none" disabled>Move to...</option>
              {this.props.bookshelfs.map((bookshelf, index)=> (
                <option key={index} value={bookshelf.identifier}>{bookshelf.title}</option>
              ))}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.bookData.title}</div>
        <div className="book-authors">{this.props.bookData.authors[0]}</div>
      </div>
    )
  }

}

export default Book
