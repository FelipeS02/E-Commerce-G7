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

router.post("/", async (req, res) => {
  let isAdmin = req.user.permissions.includes(
    "read:admin" || "write:admin" || "delete:admin"
  )
    ? true
    : false;
  const { name, email } = req.body;
  try {
    userExists = await User.findOne({
      where: {
        email: { [Op.iLike]: `%${email}%` },
      },
    });
    console.log("user", userExists);
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
