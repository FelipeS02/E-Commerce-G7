const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Order = sequelize.define("order", {
    state: {
      type: DataTypes.ENUM(["EN PROCESO", "CONFIRMADO", "DESPACHADO", "CANCELADO", "ENTREGADO"]),
      defaultValue: "EN PROCESO",
      allowNull: true,
    },
  });
  return Order;
};
