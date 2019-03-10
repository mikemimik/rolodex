'use strict';

const express = require('express');
const router = express.Router();

const bookService = require('./bookService');
const Book = require('./bookModel');

// GET /books/
router.route('/')
  .get(async (req, res, next) => {
    try {
      // 1. Fetch all books from database
      const books = await bookService.listBooks();
      // 2. Respond with list of books
      res.status(200).send({
        data: books,
      });

      // Note: also acceptable
      // res.json({
      //   data: books,
      // });
    } catch (e) {
      // 3. If error, send to the error handler
      next(e);
    }
  });

// GET /books/uuid
router.route('/:id')
  .get(async (req, res, next) => {
    const { id } = req.params;
    try {
      const book = await bookService.getBook(id);
      res.status(200).send({
        data: [book],
      });
    } catch (e) {
      next(e);
    }
  });

// POST /books/
router.route('/')
  .post(async (req, res, next) => {
    // 1. Get data from request
    const { bookData } = req.body;
    // 2. Create a book instance
    const book = new Book(bookData);

    try {
      // 3. Save book to database
      const doc = await book.save();
      // 4. Responed with created book
      res.status(201).send({
        data: [doc],
      });
    } catch (e) {
      // 5. If error, send to the error handler
      next(e);
    }
  });

exports.router = router;
