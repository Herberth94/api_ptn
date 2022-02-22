const {Router}= require ('express');
const express= require('express')
const router = express.Router();
const {postForm , viewForm ,deleteForm , editForm} = require('../controllers/usuario');
const {getForm} = require('../controllers/login');
const pool = require('../src/db');
const partidaController = require('../controllers/Partida');
const clientesController= require('../controllers/clientes');
const proyectosController= require('../controllers/proyectos');
const amController=  require('../controllers/am')

const res = require('express/lib/response');
//rutas  para cada tarea
module.exports= function(){
        router.post('/login',getForm);
//ruta para el registro de usuario con el metodo POST y para sustraer todos los usuarios registrados 
// es el método GET
        router.route('/registro')
                .post(postForm)
                .get(viewForm);
 //eliminación de registro de usuario tomando cuenta el id
        router.get('/delete/:id',deleteForm);  

        // editar un registro primero muestra la información a actulizar por medio de su Id
        /*router.get('/dataedit/:id',async(req,res)=>{
                //const {id} =  req.params;
                const reSql= await pool.query('SELECT * FROM usuarios WHERE id_usuario=?',[id]);
                res.json({reSql:reSql[0]});
                //res.end();
        });
        */
        // ruta para editar los parametros en base Id
        router.post('/edit/:id', editForm);           
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
        router.get('/clientes/view', clientesController.viewCliente);


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

        // metodo para mostar datos especificos
        router.get('/vistas/:informacion',async(req,res)=>{

        const {informacion} = req.params
        const reSql= await pool.query(`SELECT * FROM ptn_bom WHERE clave_proyecto = ?`,[informacion]);
        res.json({reSql:reSql});

        })
        router.get('/vistas/cliente/:clientes',async(req,res)=>{

                const {clientes} = req.params

                const reSql = await pool.query(` SELECT nombre_cliente FROM ${clientes}`);
                res.json({
                        reSql:reSql
                })
        });

        router.get('/vistas/clave/:proyecto',async(req,res)=>{
         const {proyecto} = req.params;       
         const reSql= await pool.query('SELECT clave_proyecto FROM proyectos');
         res.json({
                 reSql: reSql
            });

        })
  
        
               return router;        
        
}