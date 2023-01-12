const { DataTypes } = require("sequelize");

module.exports = (connection, DataTypes) => {
    const schema = {
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
            uniqure: true,
            validate: {
                notNull: {
                    args: [true],
                    msg: 'Please enter the genre for the book.'
                },
                notEmpty: {
                    args: [true],
                    msg: 'The genre cannot be empty.'
                },
            },
        },
    };
    const GenreModel = connection.define('Genre', schema);
    return GenreModel;
}