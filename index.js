const express = require('express');
require('dotenv').config()
const fs = require('fs')
const { dbConnection } = require('./database/config')
const cors = require('cors');


const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio publico
app.use( express.static('public') );

//lectura y paseo del body
app.use(express.json());

// ruTAS
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// app.get('/', (req, res) => {
//     return res.json({
//         ok: true
//     })
// })

// app.get('/data', (req, res) => {
//     try {
//         const data = fs.readFileSync('data.json', 'utf8');
//         return res.json({
//             data: JSON.parse(data)
//         })
//     } catch (error) {
//         console.error('Error reading or parsing the JSON file:', error);
//         return [];
//     }
    
// })



app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})