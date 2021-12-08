const express =  require('express');
const cors = require('cors');
const morgan = require('morgan');
//creando servidor
const app = express();

//Middleware 
app.use(cors());
app.use(express.json());
    // Ver el tipo de peticion y la ruta
app.use(morgan('dev'));

//router
 app.use('/api/cotizador',require('../routes/taskroute'));

//exportando app
module.exports = app ;
