const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Size = sequelize.define("size", {
    size: {
      type: DataTypes.ENUM(["XS", "S", "M", "L", "XL", "XXL"]),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {timestamps: false});
  return Size;
};
