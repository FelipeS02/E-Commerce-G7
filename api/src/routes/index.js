const { Router } = require('express');
const clothesByName = require('./clothesByName.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/api/allClothes', clothesByName);

module.exports = router;
