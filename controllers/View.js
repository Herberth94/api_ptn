const pool = require('../src/db');
const formControl = {};

    formControl.viewForm = async(req, res)=> {
        const reSql= await pool.query('SELECT id_usuario , rol , email,password FROM usuarios');
        res.json({reSql:reSql});
        //res.end();
        };
 module.exports = formControl;      
