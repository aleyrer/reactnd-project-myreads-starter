import * as BooksAPI from '../storageProviders/BooksAPI'
import * as BooksHelper from '../utils/BooksHelper'

export const getBooks = () =>
  BooksAPI.getAll().then((books) => {
    books = BooksHelper.fixBookProperties(books);
    return books;
  }).catch((error) => {
    console.log(error);
    return [];
  });


export const updateBook = (book, books) =>
  BooksAPI.update(book, book.shelf).then((result)=>{
    let booksCopy = books.map((bookItem) => {
      return bookItem;
    });
    let bookIndex = booksCopy.findIndex(x => x.id === book.id);

    if(!bookIndex || bookIndex === -1){
      booksCopy.push(book);
    }
    else {
      booksCopy[bookIndex] = book;
    }
    return booksCopy;
  }).catch((error)=>{
    console.log(error);
    return [];
  });


export const searchBooks = (query, books) =>
  BooksAPI.search(query, 10).then((results) => {

    if(!results || results.length === 0) {
      return [];
    }
    results = BooksHelper.fixBookProperties(results);

    return BooksHelper.enhanceSearchedBooksDataWithShelfedBooks(results, books);
  }).catch((error)=>{
    console.log(error);
    return [];
  });
