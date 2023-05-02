require ('dotenv').config();
module.exports = {

    /* database: {
        host:'localhost',
        user: 'root',
        password: '',
        database: 'db_cotizador'
    } */

   database: {
        host:process.env.DB_HOST,
        user: process.env.DB_USER,
        password:process.env.DB_PASS,
        database: process.env.DB_DB
   }

};