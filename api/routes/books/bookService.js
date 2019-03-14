'use strict';

const Book = require('./bookModel');

exports.listBooks = async () => {

};

exports.getBook = async (bookId) => {

};

exports.createBook = async (bookData) => {
  // 1. Create a book instance
  const book = new Book(bookData);
  try {
    // 2. Save book to database
    const doc = await book.save();
    // 3. return with created book
    return doc;
  } catch (e) {
    // 4. If error, throw and controller will catch
    throw e;
  }
};
