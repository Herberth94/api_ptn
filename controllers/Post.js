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
        await pool.query('INSERT INTO usuarios set ?', [newUser]);
        //res.redirect('/links');
        res.json({ 
            msg: 'Registro',
            estado: true
     });
        //console.log('prueba de enlace');
    }
       
 module.exports = formControl;
