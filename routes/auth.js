const { Router } = require('express');
const { crearUsuario, login, revalidarToken } = require("../controllers/auth")

const router = Router();

router.post('/new', crearUsuario)

router.post('/', login)

router.get('/renew', revalidarToken)

module.exports = router;