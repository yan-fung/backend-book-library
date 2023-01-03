const express = require('express');

const readerRouter = express.Router();

const readerController = require('../controllers/reader');

readerRouter.post('/', readerController.createReader)


module.exports = readerRouter;