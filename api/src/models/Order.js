const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Order = sequelize.define("order", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM([
        "CARRITO",
        "CONFIRMADO",
        "DESPACHADO",
        "CANCELADO",
        "ENTREGADO",
      ]),
      defaultValue: "CARRITO",
      allowNull: true,
    },
    total: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  });
  return Order;
};
