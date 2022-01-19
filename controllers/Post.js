const { response } = require('express');
const pool = require('../src/db');
const formControl = {};

    formControl.postForm = async(req, res)=> {
        const {email,password,rol}=req.body;
        const newUser={
            email,
            password,
            rol
        };
        const sql = await pool.query('INSERT INTO usuarios set ?', [newUser]);
        res.json({ 
            msg: 'Registro',
            estado: true
        });
        //res.end();
    }
       
 module.exports = formControl;
