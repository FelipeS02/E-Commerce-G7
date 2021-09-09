const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { Op } = require("sequelize");
const { User, Order, Clothe } = require("../../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../../controller/responseMessages");

router.get("/", async (req, res) => {
  try {
    const { userId, orderStatus } = req.query;

    const validStatus = [
      "CARRITO",
      "CONFIRMADO",
      "DESPACHADO",
      "CANCELADO",
      "ENTREGADO",
      "",
    ];
    let response;
    //Si el status es valido
    if (validStatus.includes(orderStatus)) {
      //Si userId es un UUID valido
      if (validate(userId)) {
        response = await User.findAll({
          where: {
            id: userId,
          },
          include: {
            model: Order,
            where: {
              status: { [Op.iLike]: `%${orderStatus}%` },
            },
            include: {
              model: Order_clothes,
              atributes: ["quantity", "size"],
              include: { model: Clothe },
            },
          },
        });
      } else if (userId === "") {
        //Si userId esta vacio trae TODAS las ordenes segun el status solicitado
        response = await User.findAll({
          include: {
            model: Order,
            where: {
              name: { [Op.iLike]: `%${orderStatus}%` },
            },
            include: {
              model: Order_clothes,
              atributes: ["quantity", "size"],
              include: { model: Clothe },
            },
          },
        });
      } else {
        return res.json(responseMessage(ERROR, "Usuario no valido"));
      }
      if (response.length > 0) {
        return res.json(responseMessage(SUCCESS, response));
      } else {
        return res.json(
          responseMessage(ERROR, "No existen ordenes con ese estado")
        );
      }
    } else {
      return res.json(
        responseMessage(
          ERROR,
          "El estado debe ser de tipo CARRITO - CONFIRMADO - DESPACHADO - CANCELADO - ENTREGADO. En caso de querer ver todas las ordenes, seleccionar TODOS."
        )
      );
    }
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
