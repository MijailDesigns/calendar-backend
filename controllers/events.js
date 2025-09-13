const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async(req, res = response) => {


    const Eventos = await Evento.find()
                                    .populate('user', 'name');


    res.status(201).json({
        ok: true,
        eventos: Eventos
    })
}

const crearEvento = async(req, res = response) => {

    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        const eventoGuardo = await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventoGuardo
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        })
    }
}

const actualizarEvento = (req, res = response) => {
    res.status(201).json({
        ok: true,
        msg: 'actualizar eventos'
    })
}

const eliminarEvento = (req, res = response) => {
    res.status(201).json({
        ok: true,
        msg: 'eliminar eventos'
    })
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}