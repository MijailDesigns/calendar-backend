const { response } = require('express')

const crearUsuario = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'registro'
    })
}

const login = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'login'
    })
}

const revalidarToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = { 
    crearUsuario,
    login,
    revalidarToken
}