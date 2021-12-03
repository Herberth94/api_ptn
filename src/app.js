const express =  require('express');
const cors = require('cors');
//creando servidor
const app = express();

//Middleware 
app.use(cors());
app.use(express.json());

//router
 app.use('/api/cotizador',require('../routes/taskroute'));

//exportando app
module.exports = app ;
