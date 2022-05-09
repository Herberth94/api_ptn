const express =  require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('../routes/taskroute');
//creando servidor
const app = express();

//Middleware 
app.use(cors());
const corsOptions ={

 origin:'http://localhost:3000', 
   //origin:'http://10.200.10.9:3000',  
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200
}
//  para poder recibir respuest json 
app.use(express.json({extend:true}));
    // Ver el tipo de peticion y la ruta
app.use(morgan('dev'));

//router
  //app.use('/api/cotizador',require('../routes/taskroute'));
  app.use('/api/cotizador', cors(corsOptions) ,routes());
 //   app.use('/',)

//exportando app
module.exports = app ;
