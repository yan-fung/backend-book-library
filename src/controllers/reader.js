const { Reader } = require('../models');

exports.createReader = async (req, res) => {
    const newReader = await Reader.create(req.body);
    res.status(201).json(newReader);
};

exports.getAllReaders = async (_req, res) => {
    const allReaders = await Reader.findAll();
    res.status(200).json(allReaders)
}

exports.getReadersbyId = async (req, res) => {
    try {
        const readerId = req.params.id;
        const reader = await Reader.findByPk(readerId)
        
        if (!reader) {
            res.status(404).json({ error: 'The reader could not be found.' })
        }

        res.status(200).json(reader);
    } catch (err){
        res.status(500).json(err.message)
    }
}

exports.updateReadersbyId = async (req, res) => {
    try {
        const readerId = req.params.id;
        const updateData = req.body;
        const reader = await Reader.findByPk(readerId);
        const updatedRows = await Reader.update(updateData, { where: {id: readerId} })
        
        if (!reader) {
            res.status(404).json({ error: 'The reader could not be found.' })
        }

        res.status(200).json(updatedRows);
    } catch (err){
        res.status(500).json(err.message)
    }
}

exports.deleteReadersbyId = async (req, res) => {
    try {
        const readerId = req.params.id;
        const reader = await Reader.findByPk(readerId);
        const deletedRows = await Reader.destroy({ where: { id: readerId } })

        if (!reader) {
            res.status(404).json({ error: 'The reader could not be found.' })
        }

        res.status(204).json(deletedRows)

    } catch (err) {
        res.status(500).json(err.message)
    }
}