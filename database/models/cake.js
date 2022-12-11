'use strict';
const {Model, DataTypes} = require('sequelize');
import connection from '../connection';
const initCake = (sequelize, DataTypes) => {

  class Cake extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cake.hasMany(models.Order),
      Cake.belongsTo(models.User)
    }
  }
  Cake.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    location: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cake',
  });
  return Cake;
};

export default initCake(connection, DataTypes)