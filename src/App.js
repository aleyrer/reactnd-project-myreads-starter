import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksRepository from './repositories/BooksRepository'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'


class BooksApp extends React.Component {
  state = {
    bookShelfs: [
      {
        identifier: "currentlyReading",
        title: "Currently Reading"
      },
      {
        identifier: "wantToRead",
        title: "Want to read"
      },
      {
        identifier: "read",
        title: "Read"
      }
    ],

    books: [],

    searchResult: []
  }

  getAllBooks() {
    BooksRepository.getBooks().then((books) => {
      this.setState({ books: books});
    });
  }

  updateBook = (book) => {
    BooksRepository.updateBook(book, this.state.books).then((books) => {
      this.setState({ books: books});
    });
  }

  searchBooks = (query) => {
    BooksRepository.searchBooks(query, this.state.books).then((result)=>{
      this.setState({ searchResult: result});
    });
  }

  componentDidMount() {
    this.getAllBooks();
  }

  render() {

    const { bookShelfs, books, searchResult} = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            bookshelfs={bookShelfs}
            books={books}
            updateBook={this.updateBook}
            />
        )}/>
        <Route path="/create" render={({ history }) => (
          <SearchBooks
            searchResults={searchResult}
            onSearchBooks={this.searchBooks}
            onUpdateBook={this.updateBook}
            bookshelfs={bookShelfs}
            />
        )}/>


      </div>
    )
  }
}

export default BooksApp
