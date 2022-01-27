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
        };

    formControl.viewForm = async(req, res)=> {
            const reSql= await pool.query('SELECT id_usuario , rol , email,password FROM usuarios');
            res.json({reSql:reSql});
            //res.end();
            };
    formControl.deleteForm = async(req,res)=>{
        const {id} =  req.params;
        await pool.query("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
        res.end();
           };
    formControl.editForm= async(req,res)=>{
        const {id} =  req.params;
        const {email,password,rol} =req.body;
        const editvalues =
        {
                email,
                password,
                rol  
        };
        await pool.query('UPDATE usuarios set ? WHERE id_usuario=?',[editvalues,id])
        const link= `/edit/${id} `;
        console.log(link);
        res.redirect('/api/cotizador/registro');
           };

       
 module.exports = formControl;
