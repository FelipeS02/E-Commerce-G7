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
  "642529140412-5vjvo8c5fnk0rl77pmunucjbhccfvndm.apps.googleusercontent.com",
  "D9gS5zXhloL87UqN_pU0fxdh",
  "https://developers.google.com/oauthplayground"
);

oAuth2client.setCredentials({
  refresh_token:
    "1//04O0DJaV45CxlCgYIARAAGAQSNwF-L9IrDjq5_ROHyvYTyR1qA5S6KP-YQBS3gagsngKF5n-LpGZvJ_dNLPrxhNZ4cM_5SQmwQCY",
});

const sendMail = async (email, message, mailBody) => {
  try {
    const accessToken = await oAuth2client.getAccessToken();
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "henrycommerceg7@gmail.com",
        clientId:
          "642529140412-5vjvo8c5fnk0rl77pmunucjbhccfvndm.apps.googleusercontent.com",
        clientSecret: "D9gS5zXhloL87UqN_pU0fxdh",
        refreshToken:
          "1//04aRMURXbg6i2CgYIARAAGAQSNwF-L9IrUrwIo6S_wepTRgA5O6dUeFDlh472QsURmLAN0ae5LwdEMcnivCrnrR-LJT8YswbG0EA",
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
          const emailResult = await sendMail(currentUser.email, "Orden despachada correctamente!", bodyMail)
          console.log(emailResult)
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
