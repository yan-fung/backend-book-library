module.exports = (connection, DataTypes) => {
    const schema = {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: 1,
                    msg: "Please enter the book title."
                }
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: 2,
                    msg: "Please enter the author name."
                }
            }
        },
        genre: {
            type: DataTypes.STRING,
        },
        ISBN: {
            type: DataTypes.STRING,
        }
    };

    const BookModel = connection.define('Book', schema);
    return BookModel;
}