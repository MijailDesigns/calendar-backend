const express = require('express');
require('dotenv').config()
const fs = require('fs')


const app = express();

// Directorio publico
app.use( express.static('public') )

// app.get('/', (req, res) => {
//     return res.json({
//         ok: true
//     })
// })

app.get('/data', (req, res) => {
    try {
        const data = fs.readFileSync('data.json', 'utf8');
        return res.json({
            data: JSON.parse(data)
        })
    } catch (error) {
        console.error('Error reading or parsing the JSON file:', error);
        return [];
    }
    
})



app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})