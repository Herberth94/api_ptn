const mysql = require('mysql');
const {database} =require('./keys');
const {promisify} = require('util');
const pool = mysql.createPool(database);


pool.getConnection((err,connect)=> {

    if(err){
        if (err.code == 'PROTOCOL_CONNECTION_LOST' ) {
            console.log('LA CONEXION DE LA BASE DE DATOS FUE CERRADA');
            return;
        } 
        if (err.code == 'ECONNREFUSED') {
            console.log('LA CONEXION DE LA BASE DE DATOS FUE RECHASADA');
            return;
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
         console.error('Database tiene muchas conexiones');
         return;
       }
     }
     if(connect) connect.release();
     if(connect){
        console.log('DB esta conectada');
        return;
     }
       
    
 });
// promesa a consultas (query)

pool.query = promisify(pool.query);
 module.exports = pool;

