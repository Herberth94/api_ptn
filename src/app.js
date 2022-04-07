const express =  require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('../routes/taskroute');
//creando servidor
const app = express();

//Middleware 
app.use(cors());
//  para poder recibir respuest json 
app.use(express.json({extend:true}));
    // Ver el tipo de peticion y la ruta
app.use(morgan('dev'));
//router
  //app.use('/api/cotizador',require('../routes/taskroute'));
  app.use('/api/cotizador',routes());
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(400).json({
      name: err.name


    })
  })
 //   app.use('/',)

//exportando app
module.exports = app ;
