const app =  require('./app');
const pool = require('./db');
require ('dotenv').config();
//Escuchar peticiones
app.listen(process.env.PORT || 4000 , () => {
    console.log('Servidor corriendo en el puerto: ' , process.env.PORT);
})
//conexión a la base de Datos

