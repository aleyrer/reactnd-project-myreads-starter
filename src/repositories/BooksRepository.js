import * as BooksAPI from '../storageProviders/BooksAPI'
import * as BooksHelper from '../utils/BooksHelper'

export const getBooks = () =>
  BooksAPI.getAll().then((books) => {
    books = BooksHelper.fixBookProperties(books);
    console.log("call finished");
    return books;
  }).catch((error) => {
    console.log(error);
    return [];
  });


export const updateBook = (book, books) =>
  BooksAPI.update(book, book.shelf).then((result)=>{
    let bookIndex = books.findIndex(x => x.id === book.id);

    if(!bookIndex || bookIndex === -1){
      books.push(book);
    }
    else {
      books[bookIndex] = book;
    }
    return books;
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

    return results;
  }).catch((error)=>{
    console.log(error);
    return [];
  });
