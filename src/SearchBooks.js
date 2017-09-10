import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book'
import { Link } from 'react-router-dom'

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

    const { searchResults, bookshelfs, onUpdateBook} = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              onChange={this.startSearch} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map((book, index)=>(
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

export default SearchBooks;
