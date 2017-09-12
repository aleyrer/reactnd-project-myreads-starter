export const fixBookProperties = (books) => {
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

export const enhanceSearchedBooksDataWithShelfedBooks = (results, books) => {

  results.forEach((result, index) => {
    books.forEach((book) => {
      if(result.id === book.id){
        results[index].shelf = book.shelf;
      }
    })
  });
  return results;
}
