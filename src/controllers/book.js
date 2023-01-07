const { Book } = require("../models")

exports.createBook = async (req, res) => {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook)
};

exports.getAllBooks = async (_req, res) => {
    const book = await Book.findAll();
    res.status(200).json(book);
};

exports.getBooksbyId = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findByPk(bookId);
    
        if (!book) {
            res.status(404).json({ error: 'The book could not be found.' })
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json(err.message)
    }
};

exports.updateBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        const updateData = req.body;
        const book = await Book.findByPk(bookId);
        const updatedData = await Book.update(updateData, { where: { id: bookId} });

        if (!book) {
            res.status(404).json({ error: 'The book could not be found.' })
        }
        res.status(200).json(updatedData);
    } catch (err) {
        res.status(500).json(err.message )
    }
}

exports.deleteBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findByPk(bookId);
        const deletedBook = await Book.destroy({ where: { id: bookId} });

        if (!book) {
            res.status(404).json({ error: 'The book could not be found.' })
        }
        res.status(204).json(deletedBook);

    } catch (err) {
        res.status(500).json(err.message);
    }
}