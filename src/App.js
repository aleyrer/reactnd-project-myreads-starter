import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
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
    BooksAPI.getAll().then((books) => {
      books = this.fixBookProperties(books);
      this.setState({books});
    }).catch((error) => {
      console.log(error);
      this.setState({ books : []});
    })
  }

  componentDidMount() {
    this.getAllBooks();
  }

  fixBookProperties = (books) => {
    if(books && books.length > 0){
      books.forEach((book, index) => {
        if(!book.hasOwnProperty('title')){
          books[index]['title'] = "no title";
        }
        if(!book.hasOwnProperty('authors')){
          books[index]['authors'] = [];
        }
        if(!book.hasOwnProperty('imageLinks')){
          books[index]['authors'] = {'thumbnail':'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'};
        }
        if(!book.hasOwnProperty('shelf')){
          books[index]['shelf'] = "none";
        }
      });
      return books;
    }
    return [];
  }

  updateBook = (book) => {
    BooksAPI.update(book, book.shelf).then((result)=>{
      let bookIndex = this.state.books.findIndex(x => x.id === book.id);

      let booksNew = this.state.books;

      if(!bookIndex || bookIndex === -1){
        booksNew.push(book);
      }
      else {
        booksNew[bookIndex] = book;
      }
      this.setState({books: booksNew});
    }).catch((error)=>{
      console.log(error);
    });
  }

  searchBooks = (query) => {

    BooksAPI.search(query, 10).then((result) => {

      if(!result || result.length === 0) {
        this.setState({ searchResult : []});
        return;
      }
      result = this.fixBookProperties(result);
      this.setState({ searchResult : result});
    }).catch((error)=>{
      console.log(error);
      this.setState({ searchResult : []});
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
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
              <Link to="/create">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/create" render={({ history }) => (
          <SearchBooks
            searchResults={this.state.searchResult}
            onSearchBooks={this.searchBooks}
            onUpdateBook={this.updateBook}
            bookshelfs={this.state.bookShelfs}
            />
        )}/>


      </div>
    )
  }
}

export default BooksApp
