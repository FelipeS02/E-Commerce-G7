const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const OrderProduct = sequelize.define(
    "orderProduct",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clotheId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return OrderProduct;
};
