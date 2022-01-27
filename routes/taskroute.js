const {Router}= require ('express');
const express= require('express')
const router = express.Router();
const {postForm} = require('../controllers/Post');
const {getForm} = require('../controllers/Get');
const {viewForm}= require('../controllers/View');
const pool = require('../src/db');
const partidaController = require('../controllers/Partida');
const clientesController= require('../controllers/clientes');
const proyectosController= require('../controllers/proyectos');
const amController=  require('../controllers/am')

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


        
        
     /// metodos para agrgar datos eliminar datos y modificar dato s de tabla ptn bom   
        // ruta para agregar datos a tabla por post        
        router.post('/partida',partidaController.postPtmBom);
        //ruta para modificar datos de tabla ptmBom
        router.post('/partida/update/:id',partidaController.updatePtmBom);
         //ruta para eliminar datos de tabla ptmBom
        router.delete('/partida/delete/:id',partidaController.deletePtnBom);

         // metodos para agregar elimindar y modificar clientes


         //agregar datos  clientes
        router.post('/clientes/agregar',clientesController.postClientes);
         // modificar clientes
         router.post('/clientes/update/:id',clientesController.updateClientes);        
        // elimar clientes
         router.delete('/clientes/delete/:id',clientesController.deleteClientes);


         //methodos para agregar , eliminar , modificar en la tabla proyectos 
        
         router.post('/proyectos/agregar',proyectosController.insertProyectos)
         // metodo modificar proyectos
         router.post('/proyecto/update/:id',proyectosController.updateProyectos)
         // metodo eliminar  proyecto
         router.delete('/proyecto/delete/:id',proyectosController.deleteProyectos)


         // metodos para agregar eliminar modificar tabla  am

         router.post('/am/agregar',amController.insertAm);
         router.post('/am/update/:id',amController.updateAm);
         router.delete('/am/dalete/:id',amController.deleteAm);




        
        
                return router;        
        
}