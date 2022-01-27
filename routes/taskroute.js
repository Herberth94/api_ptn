const {Router}= require ('express');
const express= require('express')
const router = express.Router();
const {postForm} = require('../controllers/Post');
const {getForm} = require('../controllers/Get');
const {viewForm}= require('../controllers/View');
const pool = require('../src/db');
const partidaController = require('../controllers/Partida')
//rutas  para cada tarea
module.exports= function(){
        router.post('/login',getForm);
        //eliminación de registro de usuario tomando cuenta el id
        router.get('/delete/:id',async(req,res)=>{
                const {id} =  req.params;
                await pool.query("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
                res.end();
        });
        
        // editar un registro primero muestra la información a actulizar por medio de su Id
        router.get('/dataedit/:id',async(req,res)=>{
                const {id} =  req.params;
                const reSql= await pool.query('SELECT * FROM usuarios WHERE id_usuario=?',[id]);
                res.json({reSql:reSql[0]});
                //res.end();
        });
        // ruta para editar los parametros en base Id
        router.post('/edit/:id', async(req,res)=>{
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
          
                
        } )
        //ruta para el registro de usuario con el metodo POST y para sustraer todos los usuarios registrados 
        // es el método GET
        router.route('/registro')
         .post(postForm)
         .get(viewForm);


        // ruta para agregar datos a tabla por post        
        router.post('/partida',partidaController.postPtmBom)
        
                return router;        
        
}