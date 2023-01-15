const express = require('express');

const readerRouter = express.Router();

const readerController = require('../controllers/reader');

readerRouter.post('/', readerController.createReader);
readerRouter.get('/', readerController.getAllReaders);
readerRouter.get('/:id', readerController.getReadersbyId);
readerRouter.patch('/:id', readerController.updateReadersbyId);
readerRouter.delete('/:id', readerController.deleteReadersbyId);

module.exports = readerRouter;
