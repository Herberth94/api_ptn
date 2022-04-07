const mysql = require('mysql');
const {database} =require('./keys');
const {promisify} = require('util');
const pool = mysql.createPool(database);

const conectar =()=>{
    
pool.getConnection((err,connect)=> {

        if(err){
            if (err.code === 'PROTOCOL_CONNECTION_LOST' ) {
                console.log('LA CONEXION DE LA BASE DE DATOS FUE CERRADA');
                setTimeout(conectar, 5000);
                return;
            } 
            if (err.code === 'ECONNREFUSED') {
                console.log('LA CONEXION DE LA BASE DE DATOS FUE RECHASADA');
                setTimeout(conectar, 5000);
                return
                
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
             console.error('Database tiene muchas conexiones');
                setTimeout(conectar, 5000);
                return;
           }
         }
         
         if(connect)
         {
            connect.release();
            console.log('DB esta conectada');
            return;
         }
           
        
     });

}
conectar();

// promesa a consultas (query)

pool.query = promisify(pool.query);
 module.exports = pool;

