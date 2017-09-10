import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book'

class SearchBooks extends Component {

  static propTypes = {
    searchResults: PropTypes.array.isRequired,
    onSearchBooks: PropTypes.func.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
    bookshelfs: PropTypes.array.isRequired
  }

  startSearch = (event) => {
    if(event.target.value.length > 0)
    this.props.onSearchBooks(event.target.value);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              onChange={this.startSearch} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchResults.map((book, index)=>(
              <li key={index}>
                <Book
                  key={book.id}
                  bookData={book}
                  bookshelfs={this.props.bookshelfs}
                  onUpdateBook={this.props.onUpdateBook}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default SearchBooks;
