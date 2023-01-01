const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');

const setupDatabase = () => {
    const connection = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
        host: PGHOST,
        port: PGPORT,
        dialect: "postgres",
        logging: false
    });

    connection.sync({alter: true})

    return {};

}

module.exports = setupDatabase()