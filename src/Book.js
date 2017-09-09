import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    title: PropTypes.string.required,
    authors: PropTypes.string.required,
    coverWidth: PropTypes.number.required,
    coverHeight: PropTypes.number.required,
    coverImageUrl: PropTypes.string.required,
    bookshelfs: PropTypes.array.required
  }

  render() {

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: this.props.coverWidth, height: this.props.coverHeight, backgroundImage: 'url('+this.props.coverImageUrl+')' }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              {this.props.bookshelfs.map((bookshelf)=> (
                <option value={bookshelf.key}>{bookshelf.title}</option>
              ))}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors}</div>
      </div>
    )
  }

}

export default Book
