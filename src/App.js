import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,

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

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    })
  }

  updateBook = (book) => {

    BooksAPI.update(book, book.shelf).then((result)=>{
      let bookIndex = this.state.books.findIndex(x => x.id === book.id);
      let booksNew = this.state.books;
      booksNew[bookIndex] = book;
      this.setState({books: booksNew});
    }).catch((error)=>{
      console.log(error);
    });
  }

  searchBooks = (query) => {
    console.log(query);
    BooksAPI.search(query, 10).then((result) => {
      console.log(result);
      this.setState({ searchResult : result});
    }).catch((error)=>{
      console.log(error);
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks
            searchResults={this.state.searchResult}
            onSearchBooks={this.searchBooks}
            onUpdateBook={this.updateBook}
            bookshelfs={this.state.bookShelfs}
            />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              {this.state.bookShelfs.map((bookShelf, index)=>(
                <BookShelf
                  key={bookShelf.identifier}
                  identifier={bookShelf.identifier}
                  title={bookShelf.title}
                  books={this.state.books.filter((book) => book.shelf === bookShelf.identifier)}
                  bookshelfs={this.state.bookShelfs}
                  onUpdateBook={this.updateBook}
                />
              ))}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
