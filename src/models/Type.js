const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Type = sequelize.define("type", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Type;
};
