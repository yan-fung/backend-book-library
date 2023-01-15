const express = require('express');

const bookRouter = express.Router();

const bookController = require('../controllers/book');

bookRouter.post('/', bookController.createBook);
bookRouter.get('/', bookController.getAllBooks);
bookRouter.get('/:id', bookController.getBooksbyId);
bookRouter.patch('/:id', bookController.updateBookById);
bookRouter.delete('/:id', bookController.deleteBookById);

module.exports = bookRouter;
