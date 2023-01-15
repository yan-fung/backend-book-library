module.exports = (connection, DataTypes) => {
  const schema = {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Please enter the author name.',
        },
        notEmpty: {
          args: [true],
          msg: 'The author name cannot be empty.',
        },
      },
    },
  };
  const AuthorModel = connection.define('Author', schema);
  return AuthorModel;
};
