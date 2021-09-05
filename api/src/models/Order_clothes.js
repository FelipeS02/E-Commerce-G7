const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Order_clothes = sequelize.define(
    "order_clothes",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Order_clothes;
};
