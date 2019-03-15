'use strict';

const express = require('express');
const router = express.Router();

const bookService = require('./bookService');

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
      //
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
    // 1. Get book ID from params object
    const { id } = req.params;
    try {
      // 2. Fetch specific book
      const book = await bookService.getBook(id);
      // 3. Respond with book
      res.status(200).send({
        data: [book],
      });
    } catch (e) {
      // 4. If error, send to the error handler
      next(e);
    }
  });

// POST /books/
router.route('/')
  .post(async (req, res, next) => {
    // 1. Get data from request body
    const { bookData } = req.body;
    try {
      // 2. Create book from data
      const book = await bookService.createBook(bookData);
      // 3. Respond with created book
      res.status(200).send({
        data: [book],
      });
    } catch (e) {
      // 4. If error, send to the error handler
      next(e);
    }
  });

exports.router = router;
