const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { route } = require('./auth');

const router = Router()

// /api/events

// validar token para todas las peticiones
router.use(validarJWT)


// todas tienes que pasar por la validacion del JWT
// Obtener eventos
router.get('/', getEventos)


// crear eventos
router.post('/', crearEvento)

// actualizr eventos
router.put('/:id', actualizarEvento)

// borrar eventos
router.delete('/:id', eliminarEvento)

module.exports = router;