'use strict';
const {Model, DataTypes} = require('sequelize');
import connection from '../connection';
const initOrder = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User),
      Order.belongsTo(models.Cake)
    }
  }
  Order.init({
    CakeId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
export default initOrder(connection, DataTypes)