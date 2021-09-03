const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Payment = sequelize.define("payment", {
		payment: {
			type: DataTypes.ENUM(["MercadoPago", "Efectivo"])
		}
	})
}