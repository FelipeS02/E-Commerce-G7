const { Router } = require("express");
const router = Router();
const { User } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

router.post("/login", async (req, res) => {
  const { name, email } = req.body;
  try {
    userExists = User.findByPk(email);
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
