const express = require('express');

const authorRouter = express.Router();

const authorController = require('../controllers/author');

authorRouter.post('/', authorController.createAuthor);
authorRouter.get('/', authorController.getAllAuthor);
authorRouter.get('/:id', authorController.getAuthorById);
authorRouter.patch('/:id', authorController.updateAuthorById);
authorRouter.delete('/:id', authorController.deleteAuthorById);

module.exports = authorRouter;
