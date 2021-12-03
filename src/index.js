const app =  require('./app');
require ('dotenv').config();
//const {dbconexion}  = require('./database');

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: ' , process.env.PORT);
})
//conexión a la base de Datos
//dbconexion();
