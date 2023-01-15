const express = require('express');

const genreRouter = express.Router();

const genreController = require('../controllers/genre');

genreRouter.post('/', genreController.createGenre);
genreRouter.get('/', genreController.getAllGenre);
genreRouter.get('/:id', genreController.getGenreById);
genreRouter.patch('/:id', genreController.updateGenreById);
genreRouter.delete('/:id', genreController.deleteGenreById);

module.exports = genreRouter;
