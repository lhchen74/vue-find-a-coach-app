const { sequelize, Sequelize } = require('../database/db')

const Model = Sequelize.Model;

class Request extends Model { }

Request.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    autoIncrement: true
  },
  userEmail: {
    type: Sequelize.STRING
  },
  message: {
    type: Sequelize.STRING
  },
  coachId: {
    type: Sequelize.STRING
  },
}, {
  sequelize,
  modelName: 'requests',
  timestamps: false
});


module.exports = Request