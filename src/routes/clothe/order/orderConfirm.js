const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const nodemailer = require("nodemailer");
const confirm = require("../../../mails/confirm.js");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;
const { google } = require("googleapis");
const { User, Direction, Order, Size, Clothe } = require("../../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../../controller/responseMessages");

const oAuth2client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

await oAuth2client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

const sendMail = async (email, mailBody) => {
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
      subject: "Orden Confirmada",
      html: mailBody,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};

const clotheUpdate = async (clothesArray) => {
  const process = clothesArray.map(async (e) => {
    const { id, quantity_and_size: qs } = e;
    const currentClotheSize = await Size.findOne({
      where: { size: qs.dataValues.size, clotheId: id },
    });
    await currentClotheSize.decrement(["stock"], {
      by: qs.dataValues.quantity,
    });
  });
  await Promise.all(process);
};

const orderFormatter = (orderClothes) => {
  const result = orderClothes
    .map((e) => {
      const { name, quantity_and_size: qs, price } = e;
      return `
    <tr>
      <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
          ${name} ${qs.dataValues.size} x${qs.dataValues.quantity}
      </td>
      <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
          $${price * qs.dataValues.quantity}
      </td>
    </tr>
    `;
    })
    .join("");
  return result;
};

router.post("/", async (req, res) => {
  try {
    const {
      body: {
        data: { orderId, payment, direction },
      },
    } = req;

    const validPayment = ["Efectivo / Transferencia", "MercadoPago"];

    if (
      direction !== "" &&
      validate(orderId) &&
      validPayment.includes(payment)
    ) {
      const currentOrder = await Order.findOne({
        where: { id: orderId },
        attributes: ["id", "direction", "payment", "total", "userId", "state"],
        include: {
          model: Clothe,
          attributes: ["id", "name", "price", "color", "genre", "detail"],
          through: {
            as: "quantity_and_size",
            attributes: ["quantity", "size"],
          },
        },
      });
      if (currentOrder.state === "CARRITO") {
        const [result, currentUser, [currentDirection, isCreated]] =
          await Promise.all([
            await clotheUpdate(currentOrder.clothes),
            await User.findByPk(currentOrder.userId),
            await Direction.findOrCreate({
              where: {
                data: direction,
              },
            }),
          ]);

        const userhasDirection = await currentUser.hasDirection(
          currentDirection
        );

        if (!userhasDirection) {
          currentUser.addDirection(currentDirection);
        }

        const formatOrder = orderFormatter(currentOrder.clothes);
        const mail = confirm(
          formatOrder,
          direction,
          payment,
          currentOrder.total,
          currentOrder.id
        );

        await Promise.all([
          await currentOrder.update({
            payment: payment,
            direction: direction,
            state: "CONFIRMADO",
          }),
          await sendMail(currentUser.email, mail),
        ]);
        res.json(responseMessage(SUCCESS, "Orden Confirmada!"));
      } else {
        res.json(responseMessage(ERROR, "La orden debe tener estado 'CARRITO'"));
      }
    } else {
      res.json(
        responseMessage(
          ERROR,
          "El metodo de pago es incorrecto o el usuario no es valido"
        )
      );
    }
  } catch (err) {
    const { message } = err;
    console.log(err)
    res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
