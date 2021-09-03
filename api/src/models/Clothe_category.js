const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Clothe_category = sequelize.define(
    "clothe_category",
    {},
    { timestamps: false }
  );
  return Clothe_category;
};
