const { response } = require('express');
const pool = require('../src/db');
const formControl = {};

    formControl.getForm = async(req, res)=> {
        const {email,password,rol}=req.body;
        const newUser={
            email,
            password
        };
        const reSql= await pool.query('SELECT rol FROM usuarios WHERE (email =?) AND (password=?)',[newUser.email,newUser.password]);
        if (Object.keys(reSql).length === 0 ){
           res.json({ msg:false });
        }
        else{
            //console.log(" registrado");
           res.json({ msg: reSql[0].rol });
        }
        
    }
       
 module.exports = formControl;
