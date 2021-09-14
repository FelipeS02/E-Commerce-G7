const { Router } = require("express");
const router = Router();
const { validate } = require("uuid");
const { Review, Clothe, User } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

router.post("/", async (req, res) => {
  try {
    const { userId, clotheId, score, review } = req.body.data;
    if (
      validate(userId) &&
      typeof clotheId === "number" &&
      typeof score === "number" &&
      typeof review === "string"
    ) {
      const user = await User.findByPk(userId);
      const [clothe, clotheReview] = await Promise.all([
        await Clothe.findByPk(clotheId),
        await Review.create({ score, review, username: user.name }),
      ]);
      await Promise.all([
        await user.addReview(clotheReview),
        await clothe.addReview(clotheReview),
      ]);
      return res.json(responseMessage(SUCCESS, "Review agregada correctamente"));
    } else {
      return res.json(responseMessage(ERROR, "Uno de los datos es incorrecto"));
    }
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
});

module.exports = router;
