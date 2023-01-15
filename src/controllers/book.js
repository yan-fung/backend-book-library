const {
  getAllItems,
  createItem,
  updateItem,
  getItemById,
  deleteItem,
} = require('./helpers');

const createBook = (req, res) => createItem(res, 'book', req.body);

const getAllBooks = (_req, res) => getAllItems(res, 'book');

const getBooksbyId = (req, res) => getItemById(res, 'book', req.params.id);

const updateBookById = (req, res) =>
  updateItem(res, 'book', req.body, req.params.id);

const deleteBookById = (req, res) => deleteItem(res, 'book', req.params.id);

module.exports = {
  createBook,
  getAllBooks,
  getBooksbyId,
  updateBookById,
  deleteBookById,
};
