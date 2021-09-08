const { Router } = require("express");
const router = Router();
const { User } = require("../../db");
const { Op } = require("sequelize");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
var jwtCheck = jwt({
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

router.post("/login", async (req, res) => {
  console.log(req.user);
  const { name, email } = req.body;
  try {
    userExists = User.findOne({
      where: {
        email: { [Op.iLike]: `%${email}%` },
      },
    });
    if (!userExists) {
      const newUser = User.create({
        name: name,
        email: email,
      });
      return res.json(
        responseMessage(SUCCESS, {
          message: "Usuario creado",
          userData: {
            name,
            email,
          },
        })
      );
    } else {
      return res.status(200).json({ succes: true });
    }
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
