const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Direction = sequelize.define("direction", {
    data: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, { timestamps: false });
  return Direction;
};
