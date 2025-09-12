const { Router } = require('express');
const { check } = require('express-validator')
const { crearUsuario, login, revalidarToken } = require("../controllers/auth")

const router = Router();

router.post(
    '/new', 
    [ //middlewares
        check('name', 'El nombre es obligadorio').not().isEmpty(),
        check('email', 'El email es obligadorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 })
    ] , 
    crearUsuario
)

router.post(
    '/', 
    [
        check('email', 'El email es obligadorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 })
    ],
    login
)

router.get('/renew', revalidarToken)

module.exports = router;