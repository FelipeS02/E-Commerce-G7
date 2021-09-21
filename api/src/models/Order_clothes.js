const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Order_clothes = sequelize.define(
    "order_clothes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      size: {
        type: DataTypes.ENUM(["XS", "S", "M", "L", "XL", "XXL"]),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Order_clothes;
};
