const express= require('express')
const router = express.Router();
const {postForm , viewForm ,deleteForm , editForm} = require('../controllers/usuario');
const {getForm} = require('../controllers/login');
const pool = require('../src/db');
const partidaController = require('../controllers/Partida');
const clientesController= require('../controllers/clientes');
const spController = require('../controllers/servicios_productos');
const precioController = require ('../controllers/precio');
const proveedorController = require ('../controllers/proveedor');
const marcaController = require ('../controllers/marca');
const proyectosController= require('../controllers/proyecto');
const amController=  require('../controllers/am');
const colaboradoresController =require('../controllers/colaboradores');
const pspController =require('../controllers/psp')
const { route } = require('express/lib/application');

//rutas  para cada tarea
module.exports= function(){

/*--------------------------------------------------------------------------------------------------------------------*/
/*=====TABLA DE USUARIO ========*/
//Ruta de login de usuaruio
        router.post('/login',getForm);
//ruta para el registro de usuario con el metodo POST y para sustraer todos los usuarios registrados usar método GET
        router.route('/registro')
                .post(postForm)
                .get(viewForm);
//eliminación de registro de usuario tomando cuenta el id
        router.get('/delete/:id',deleteForm);  
        // ruta para editar los parametros en base Id
        router.post('/edit/:id', editForm);           

/*--------------------------------------------------------------------------------------------------------------*/
/*=====TABLA DE PARITDA ========*/

// metodos para agrgar datos eliminar datos y modificar datos de tabla proyecto  
        // ruta para agregar datos a tabla por post        
        router.post('/partida/:id',partidaController.postPtmBom);
        //ruta para modificar datos de tabla ptmBom
        router.post('/partida/update/:id',partidaController.updatePtmBom);
         //ruta para eliminar datos de tabla ptmBom
        router.delete('/partida/delete/:id',partidaController.deletePtnBom);
        
/*--------------------------------------------------------------------------------------------------------------*/
/*=====TABLA DE CLIENTES ========*/

         //agregar datos  clientes
        router.post('/clientes/agregar',clientesController.postClientes);
         // modificar clientes
        router.post('/clientes/update/:id',clientesController.updateClientes);        
        // elimar clientes
        router.delete('/clientes/delete/:id',clientesController.deleteClientes);
        router.get('/clientes/view', clientesController.viewCliente);
/*--------------------------------------------------------------------------------------------------------------------*/
/*=====TABLA DE PROYECTO ========*/

         //ruta para  agregar proyecto 
        router.post('/proyecto/agregar/:id',proyectosController.insertProyectos)
         // ruta para modificar proyectos
        router.post('/proyecto/update/:id',proyectosController.updateProyectos)
         //ruta  eliminar  proyecto
        router.delete('/proyecto/delete/:id',proyectosController.deleteProyectos);

/*--------------------------------------------------------------------------------------------------------------------*/
/*===== TABLA DE COLABORADORES ========*/


        router.post('/colaboradores/:id',colaboradoresController.insertColaborador);

/*--------------------------------------------------------------------------------------------------------------------*/
/*===== TABLA DE PSP ========*/

        router.post('/psp',pspController.insertPsp);

/*--------------------------------------------------------------------------------------------------------------------*/
/*=====TABLA DE SERVIVCIO_PRODUCTO ========*/

        // Metodos para la tabla servicio_producto:
        // Agregar 
        router.post('/sp/agregar',spController.insert_sp);
        // Editar 
        router.put('/sp/edit/:id',spController.update_sp);
        // Eliminar 
        router.delete('/sp/delete/:id',spController.delete_sp);
        // Visualizar
        router.get('/sp/view',spController.view_sp);

/*--------------------------------------------------------------------------------------------------------------------*/
/*=====TABLA DE PRECIO ========*/
// Metodos para la tabla precio:
        // Agregar 
        router.post('/precio/agregar',precioController.insert_precio);
        // Editar 
        router.put('/precio/edit/:id',precioController.update_precio);
        // Eliminar 
        router.delete('/precio/delete/:id',precioController.delete_precio);

/*--------------------------------------------------------------------------------------------------------------------*/
/*=====TABLA DE PROVEEDOR ========*/
// Metodos para la tabla proveedor:
        // Agregar 
        router.post('/proveedor/agregar',proveedorController.insert_prov);
        // Editar 
        router.put('/proveedor/edit/:id',proveedorController.update_prov);
        // Eliminar 
        router.delete('/proveedor/delete/:id',proveedorController.delete_prov);

/*--------------------------------------------------------------------------------------------------------------------*/
/*=====TABLA DE MARCA ========*/
// Metodos para la tabla marca:
        // Agregar 
        router.post('/marca/agregar',marcaController.insert_marca);
        // Editar 
        router.put('/marca/edit/:id',marcaController.update_marca);
        // Eliminar 
        router.delete('/marca/delete/:id',marcaController.delete_marca);

/*--------------------------------------------------------------------------------------------------------------------*/

         // metodos para agregar eliminar modificar tabla  am

         router.post('/am/agregar',amController.insertAm);
         router.post('/am/update/:id',amController.updateAm);
         router.delete('/am/dalete/:id',amController.deleteAm);
         
/*--------------------------------------------------------------------------------------------------------------------*/

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