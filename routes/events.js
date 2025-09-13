const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate')


const router = Router()

// /api/events

// validar token para todas las peticiones
router.use(validarJWT)


// todas tienes que pasar por la validacion del JWT
// Obtener eventos
router.get('/', getEventos)


// crear eventos
router.post(
    '/', 
    [
        check('title', 'titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ], 
    crearEvento
)

// actualizr eventos
router.put('/:id', actualizarEvento)

// borrar eventos
router.delete('/:id', eliminarEvento)

module.exports = router;