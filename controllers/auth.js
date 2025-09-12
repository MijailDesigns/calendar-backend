const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario');
const { generarJWT } =  require('../helpers/jwt')

const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body; 
    
    try {
        let usuario = await Usuario.findOne({ email });
        
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            })
        }
        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
    
        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario._id, usuario.name)
    
        res.status(201).json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin',
        })
    }
    
}

const login = async(req, res = response) => {

    const { email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        // confirmar los passwords
        const validPasswords = bcrypt.compareSync(password, usuario.password);

        if (!validPasswords) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }


        // Generar JWT
        const token = await generarJWT(usuario._id, usuario.name)

        res.status(200).json({
            ok: true,
            msg: 'login',
            uid: usuario._id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin',
        })
    }
}

const revalidarToken = async(req, res = response) => {
    const {uid, name} = req;

    // generar un nuevo JWT

    const token = await generarJWT(uid, name)
    res.json({
        ok: true,
        token
    })
}

module.exports = { 
    crearUsuario,
    login,
    revalidarToken
}