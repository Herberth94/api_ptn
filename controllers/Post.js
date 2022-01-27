const { response } = require('express');
const pool = require('../src/db');
const formControl = {};

    formControl.postForm = async(req, res)=> {
        const {email,password,rol}=req.body;
        const newUser={
            rol,
           email,
            password
        };
        const sql = await pool.query('INSERT INTO usuarios set ?', [newUser]);
        res.json({ 
            msg: 'Registro exitoso',
            estado: true
        });
        //res.end();
    }
       
 module.exports = formControl;
