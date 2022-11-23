const { sequelize, Sequelize } = require('../database/db')

const Model = Sequelize.Model;
class User extends Model { }
User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    sequelize,
    modelName: 'users',
    timestamps: false
});


module.exports = User