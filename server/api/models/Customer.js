const Sequelize = require('sequelize');
const bcryptSevice = require('../services/bcrypt.service');

const sequelize = require('../../config/database');

// const hooks = {
//   beforeCreate(user) {
//     user.password = bcryptSevice.password(user); // eslint-disable-line no-param-reassign
//   },
// };

// const instanceMethods = {
//   toJSON() {
//     const values = Object.assign({}, this.get());

//     delete values.password;

//     return values;
//   },
// };

const tableName = 'customers';

const Customer = sequelize.define('Customer', {
  name: {
    type: Sequelize.STRING,
  },
  mobile: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  gender: {
    type: Sequelize.ENUM('MALE','FEMALE'),
  },
  status: {
    type: Sequelize.ENUM('ACTIVE','INACTIVE'),
  },
}, { tableName });

module.exports = Customer;
