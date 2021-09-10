const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { Op } = require("sequelize");
const { User, Order, Clothe, Order_clothes } = require("../../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../../controller/responseMessages");

router.get("/", async (req, res) => {
  try {
    const { userId = "", orderStatus = "" } = req.query;

    const validStatus = [
      "CARRITO",
      "CONFIRMADO",
      "DESPACHADO",
      "CANCELADO",
      "ENTREGADO",
    ];

    let response;
    if (validate(userId) && validStatus.includes(orderStatus)) {
      response = await User.findAll({
        where: {
          id: userId,
        },
        attributes: ["id", "name", "email"],
        include: {
          model: Order,
          where: {
            state: orderStatus,
          },
          attributes: ["id", "state", "total"],
          through: { attributes: [] },
          include: {
            model: Clothe,
            attributes: ["id", "name", "price", "color", "genre", "detail"],
            through: {
              as: "quantity_and_size",
              attributes: ["quantity", "size"],
            },
          },
        },
      });
    } else if (userId === "" && orderStatus === "") {
      response = await User.findAll({
        attributes: ["id", "name", "email"],
        include: {
          model: Order,
          attributes: ["id", "state", "total"],
          through: { attributes: [] },
          include: {
            model: Clothe,
            attributes: ["id", "name", "price", "color", "genre", "detail"],
            through: {
              as: "quantity_and_size",
              attributes: ["quantity", "size"],
            },
          },
        },
      });
    } else if (validate(userId) && orderStatus === "") {
      response = await User.findAll({
        where: {
          id: userId,
        },
        attributes: ["id", "name", "email"],
        include: {
          model: Order,
          attributes: ["id", "state", "total"],
          through: { attributes: [] },
          include: {
            model: Clothe,
            attributes: ["id", "name", "price", "color", "genre", "detail"],
            through: {
              as: "quantity_and_size",
              attributes: ["quantity", "size"],
            },
          },
        },
      });
    } else if (userId === "" && validStatus.includes(orderStatus)) {
      response = await User.findAll({
        attributes: ["id", "name", "email"],
        include: {
          model: Order,
          where: { state: orderStatus },
          attributes: ["id", "state", "total"],
          through: { attributes: [] },
          include: {
            model: Clothe,
            attributes: ["id", "name", "price", "color", "genre", "detail"],
            through: {
              as: "quantity_and_size",
              attributes: ["quantity", "size"],
            },
          },
        },
      });
    } else {
      return res.json(responseMessage(ERROR, "Usuario y/o estado no valido"));
    }
    if (response.length > 0) {
      return res.json(responseMessage(SUCCESS, response));
    } else {
      return res.json(
        responseMessage(ERROR, "No existen ordenes con ese estado y/o usuario")
      );
    }
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
