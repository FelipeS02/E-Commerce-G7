const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Review = sequelize.define(
    "review",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        min: 0,
        max: 5,
        allowNull: false,
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
  return Review;
};
