const {Router}= require ('express');
const express= require('express')
const router = express.Router();
const {postForm} = require('../controllers/Post');
const {getForm} = require('../controllers/Get');
const {viewForm}= require('../controllers/View');
const pool = require('../src/db');
const partidaController = require('../controllers/Partida');
const res = require('express/lib/response');
//rutas  para cada tarea
module.exports= function(){
        router.post('/login',getForm);
        //eliminación de registro de usuario tomando cuenta el id
        router.get('/delete/:id',async(req,res)=>{
                const {id} =  req.params;
                await pool.query("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
                res.end();
        });
        
        //editar un registro, primero muestra la información a actulizar por medio de su Id
        router.get('/dataedit/:id',async(req,res)=>{
                const {id} =  req.params;
                const reSql= await pool.query('SELECT * FROM usuarios WHERE id_usuario=?',[id]);
                res.json({reSql:reSql[0]});
                //res.end();
        });
        //ruta para editar los parametros en base Id
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
          
                
        });
        //ruta para el registro de usuario con el metodo POST y para sustraer todos los usuarios registrados 
        // es el método GET
        router.route('/registro')
         .post(postForm)
         .get(viewForm);


        // ruta para agregar datos a tabla por post        
        router.post('/partida',partidaController.postPtmBom);

        //ruta para modificar datos de tabla ptmBom
        router.post('/partida/update/:id', async(req,res)=>{
                const {id} =  req.params;
                const editptnBom =req.body;
                const updaetsql=await pool.query('UPDATE ptn_bom set ? WHERE id_ptn_bom=?',[editptnBom,id])
                const link= `/partida/update/${id} `;
                console.log(link);
                res.redirect('/api/cotizador/');
                        
        } );

        router.delete('/partida/delete/:id',async(req,res)=>{
                const {id} =  req.params;
                await pool.query("DELETE FROM ptn_bom WHERE id_ptn_bom= ?", [id]);
                res.end();
        });

 //////métodos para agregar elimindar y modificar clientes
   //agregar datos 
        router.post('/clientes/agregar',async(req,res)=>{

                const insertClientes= req.body;
                await pool.query('INSERT INTO clientes set ?',insertClientes);
                res.json({
                        msg: 'Partida Agregada',
                
                        estado: true
                    });

        });
         // modificar clientes
         router.post('/clientes/update/:id',async(req,res)=>{
                 const {id}= req.params;  
                 const updatUsuario = req.body;
                 await pool.query('UPDATE clientes set ? WHERE id_cliente=?',[updatUsuario,id])           
                 const link= `/clientes/update/${id} `;
                 console.log(link);
                 res.json({
                         msg: 'modficiacion de usuario con exito ',
                         estado: true
                 });

        });
        // elimar clientes
         router.delete('/clientes/delete/:id',async(req,res)=>{
                 const {id} = req.params;
                 await pool.query("DELETE FROM clientes WHERE id_cliente= ?", [id]);
                 res.json({
                         msg: 'cliente Eliminado',
                         estado: true
                 });

         });

         //métodos para agregar , eliminar , modificar en la tabla proyectos 
        
         router.post('/proyectos/agregar',async(req,res)=>{
                 const insertProyectos = req.body;
                 await pool.query("INSERT INTO proyectos set ?",insertProyectos);
                 res.json({
                         msg: 'Proyecto agregado',
                         estado: true
                 });

        });
         // método modificar
         router.post('/proyecto/update/:id',async(req,res)=>{
                 const {id}= req.params ;
                 const updateProyectos =req.body;
                 await pool.query("UPDATE proyectos set ? WHERE id_usuario=?",[updateProyectos,id]);
                 res.json({
                         msg: 'Proyectos  se estan modificando',
                         estado: true
                })
         });
         // método eliminar 
         router.delete('/proyecto/delete/:id',async(req,res)=>{
                 const {id} = req.params;
                 await pool.query("DELETE FROM proyectos WHERE id_usuario= ?",[id]);
                 res.json({
                         msg: 'proyectos eleminados',
                         estado : true
                })  
         });
         // agregar eliminar modificar tabla  am
         router.post('/am/agregar',async(req,res)=>{
                 const insertAm = req.body;
                 await pool.query("INSERT INTO am set ?",insertAm);
                 res.json({
                         msg:"se agregado correctamente am",
                         estado:true
                })
         });
         router.post('/am/update/:id',async(req,res)=>{
                 const {id}= req.params; 
                 const updateAm = req.body;
                 await pool.query("UPDATE am set ? WHERE id_am=?",[updateAm,id]);
                 res.json({
                         msg:"se modifico  am",
                         estado:true
                })
         });

         router.delete('/am/delete/:id',async(req,res)=>{
                 const {id}= req.params;
                 await pool.query("DELETE FROM am WHERE id_am= ?",[id]);
                 res.json({
                         msg:"se elimino am",
                         estado:true
                 })

         })    
               return router;        
 
}