const {
  getAllItems,
  createItem,
  updateItem,
  getItemById,
  deleteItem,
} = require('./helpers');

const getAllReaders = (_, res) => getAllItems(res, 'reader');

const createReader = (req, res) => createItem(res, 'reader', req.body);

const updateReadersbyId = (req, res) =>
  updateItem(res, 'reader', req.body, req.params.id);

const getReadersbyId = (req, res) => getItemById(res, 'reader', req.params.id);

const deleteReadersbyId = (req, res) =>
  deleteItem(res, 'reader', req.params.id);

module.exports = {
  getAllReaders,
  getReadersbyId,
  createReader,
  updateReadersbyId,
  deleteReadersbyId,
};
