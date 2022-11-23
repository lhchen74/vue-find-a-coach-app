const { sequelize, Sequelize } = require('../database/db')

const Model = Sequelize.Model;

class Coach extends Model { }

Coach.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  areas: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  hourRate: {
    type: Sequelize.NUMBER
  }
}, {
  sequelize,
  modelName: 'coaches',
  timestamps: false
});


module.exports = Coach