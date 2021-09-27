const { Router } = require("express");
const router = Router();
const dispatch = require("../../mails/dispatch.js");
const delivered = require("../../mails/delivered")
const nodemailer = require("nodemailer");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;
const { google } = require("googleapis");
const { validate } = require("uuid");
const { Order, User } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

const oAuth2client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

const sendMail = async (email, message, mailBody) => {
  try {
    const accessToken = await oAuth2client.getAccessToken();
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "henrycommerceg7@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });
    const mailOptions = {
      from: "<henrycommerceg7@gmail.com>",
      to: email,
      subject: message,
      html: mailBody,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};

// Auth0
const jwtAuthz = require("express-jwt-authz");
const checkScopes = (permissions) => jwtAuthz(permissions);

router.get("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { stateOrder } = req.query;
    const validStates = [
      "CARRITO",
      "CONFIRMADO",
      "DESPACHADO",
      "CANCELADO",
      "ENTREGADO",
    ];
    if (validStates.includes(stateOrder) && validate(orderId)) {
      const currentOrder = await Order.findByPk(orderId);
      if (stateOrder === "DESPACHADO") {
        if (currentOrder.state === "CONFIRMADO") {
          await currentOrder.update({ state: stateOrder });
          const currentUser = await User.findByPk(currentOrder.userId);
          const bodyMail = dispatch(currentOrder.direction);
          await sendMail(currentUser.email, "Orden despachada correctamente!", bodyMail)
        } else {
          return res.json(responseMessage(ERROR, "No se puede despachar una orden sin confirmar"))
        }
      } else if (stateOrder === "ENTREGADO") {
        if (currentOrder.state === "DESPACHADO" || currentOrder.state === "CONFIRMADO") {
          await currentOrder.update({ state: stateOrder });
          const currentUser = await User.findByPk(currentOrder.userId);
          const bodyMail = delivered(currentOrder.direction)
          await sendMail(
            currentUser.email,
            "Orden entregada correctamente!",
            bodyMail
          );
        } else {
          return res.json(responseMessage(ERROR, "No se puede entregar una orden sin confirmar o despachada"))
        }
      } else {
        await currentOrder.update({ state: stateOrder });
      }
      res.json(responseMessage(SUCCESS, "Estado actualizado correctamente"));
    } else {
      res.json(
        responseMessage(ERROR, "Alguno de los parametros es incorrecto")
      );
    }
  } catch (err) {
    const { message } = err;
    res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
