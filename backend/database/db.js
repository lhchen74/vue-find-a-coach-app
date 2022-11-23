const Sequelize = require('sequelize');
const db = {}

const sequelize = new Sequelize('find-a-coach', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
