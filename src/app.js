

const express =  require('express');
const cors = require('cors');
const morgan = require('morgan');
//const externalip = require('externalip');
const routes = require('../routes/taskroute');
//creando servidor
const app = express();


const config = {
  application: {
    cors:{
      server: [
        {
          origin: '10.200.10.9:3000 ,200.194.42.18:3000',
          credentials: true
        }
      ]
    }
  }

}

app.use(cors(
  config.application.cors.server
));

/* exports.handler = async (event) => {
  const response = {
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
}; */
// externalip(function (err, ip) {
//   console.log(ip); // => 8.8.8.8
// });

//Middleware 
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');3
//   res.header('Access-Control-Private-Network', 'true');
//   res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

//   next();
// });

// var puerto = `:3000`;
// var allowlist = [`http://10.200.10.9${puerto}`,`http://200.194.42.18${puerto}`,]//`*${puerto}`] 
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }



// const corsOptions ={

//  // origin:'http://localhost:3000', 
//    origin:ip,  

   
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200
// } 
//  para poder recibir respuest json 
app.use(express.json({extend:true}));
    // Ver el tipo de peticion y la ruta
app.use(morgan('dev'));

//router
  //app.use('/api/cotizador',require('../routes/taskroute'));
  //app.use('/api/cotizador', cors(corsOptionsDelegate),routes());
  app.use('/api/cotizador', routes());
 //   app.use('/',)

//exportando app
module.exports = app ;


