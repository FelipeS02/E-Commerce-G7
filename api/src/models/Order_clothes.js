const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Order_clothes = sequelize.define(
    "order_clothes",
    {},
    { timestamps: false }
  );
  return Order_clothes;
};
