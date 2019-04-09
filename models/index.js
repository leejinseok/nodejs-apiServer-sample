'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('config');
const sequelize = new Sequelize(config.get('db'));
let db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') === -1) && (file !== basename);
  })
  .forEach(file => {
    let model = sequelize['import'](path.join(__dirname, file, 'index.js'));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;