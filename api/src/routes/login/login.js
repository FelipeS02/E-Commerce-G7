const { Router } = require("express");
const router = Router();
const { User } = require("../../db");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;
const welcomeMail = require("../../mails/welcome");
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

const sendMail = async (email, name, id) => {
  try {
    const accessToken = await oAuth2client.getAccessToken();
    const transporter = nodemailer.createTransport({
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
      subject: "Bienvenido a E-Commerce G7",
      html: welcomeMail(name, id),
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};

let jwt = require("express-jwt");
let jwks = require("jwks-rsa");
let jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-1ik4n80w.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://ecommerce7",
  issuer: "https://dev-1ik4n80w.us.auth0.com/",
  algorithms: ["RS256"],
});

router.use(jwtCheck);

router.post("/", async (req, res) => {
  try {
    let isAdmin = req.user.permissions.includes(
      "read:admin" || "write:admin" || "delete:admin"
    )
      ? true
      : false;
    const { name, email } = req.body;
    const userExists = await User.findOne({
      where: {
        email: { [Op.iLike]: `%${email}%` },
      },
    });
    if (userExists)
      return res.json(
        responseMessage(SUCCESS, {
          message: "Usuario existente",
          userData: {
            id: userExists.id,
            name,
            email,
            isAdmin,
          },
        })
      );

    const newUser = await User.create({
      name: name,
      email: email,
      isAdmin: isAdmin,
    });
    await sendMail(email, name, newUser.id);
    return res.json(
      responseMessage(SUCCESS, {
        message: "Usuario creado",
        userData: {
          id: userExists.id,
          name,
          email,
          isAdmin,
        },
      })
    );
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
