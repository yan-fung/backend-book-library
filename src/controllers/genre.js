const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require('./helpers');

const createGenre = (req, res) => createItem(res, 'genre', req.body);

const getAllGenre = (_req, res) => getAllItems(res, 'genre');

const getGenreById = (req, res) => getItemById(res, 'genre', req.params.id);

const updateGenreById = (req, res) =>
  updateItem(res, 'genre', req.body, req.params.id);

const deleteGenreById = (req, res) => deleteItem(res, 'genre', req.params.id);

module.exports = {
  createGenre,
  getAllGenre,
  getGenreById,
  updateGenreById,
  deleteGenreById,
};
