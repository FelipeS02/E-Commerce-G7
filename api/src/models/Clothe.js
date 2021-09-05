const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Clothe = sequelize.define("clothe", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.ENUM(["XS", "S", "M", "L", "XL", "XXL", "Unico", "28", "30", "32", "34", "36"]),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre: {
      type: DataTypes.ENUM(["Masculino", "Femenino", "Otro"]),
      allowNull: false,
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });
  return Clothe;
};
