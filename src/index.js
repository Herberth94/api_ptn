const app =  require('./app');
const pool = require('./db');
require ('dotenv').config();
//Escuchar peticiones al puerto
app.listen( process.env.PORT || 4001 , () => {
    console.log('Servidor corriendo en el puerto: ' ,process.env.PORT || 4001);
})
//conexión a la base de Datos

