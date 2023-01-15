module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: {
          args: 2,
          msg: 'Please enter your name.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: 8,
          msg: 'Password must have at least 8 characters, please re-enter.',
        },
      },
    },
  };

  const ReaderModel = connection.define('Reader', schema);
  return ReaderModel;
};
