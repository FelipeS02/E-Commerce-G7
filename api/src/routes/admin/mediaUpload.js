const { Router } = require("express");
const router = Router();
const multer = require("multer");

//Middleware para codificacion/decodificacion de datos
// router.use(multer({}))

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.array('pictures', 8) ,(req, res) => {
    res.send(req.files.buffer)
});

module.exports = router;
