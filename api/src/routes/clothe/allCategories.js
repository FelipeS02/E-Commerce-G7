const { Router } = require("express");
const router = Router();
const { Category } = require("../../db");
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

router.get("/all-categories", async (_req, res) => {
  try {
    const response = await Category.findAll();
    if (response.length > 0) {
      res.json(responseMessage(SUCCESS, response));
    } else {
      res.json(responseMessage(ERROR, "No existe ninguna categoria"));
    }
  } catch (err) {
    const { message } = err;
    res.status(400).json(responseMessage(ERROR, message));
  }
});

module.exports = router;
