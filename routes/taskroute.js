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
<<<<<<< HEAD
const proyectosController= require('../controllers/proyecto');
const amController=  require('../controllers/am');
const colaboradoresController =require('../controllers/colaboradores');
const pspController =require('../controllers/psp')
const { route } = require('express/lib/application');
=======
const pmController = require ('../controllers/proveedor_marca');
const monedaController = require ('../controllers/moneda.js');
const categoriaController = require ('../controllers/categoria')

const proyectosController= require('../controllers/proyecto');
const catsController = require ('../controllers/categorias_c_a_sptn_ma');
const cattController = require ('../controllers/cat_totales');
const pcController = require ('../controllers/proyectos_cat');
const cctController = require ('../controllers/cat_cat_t');
const amController=  require ('../controllers/am');
const ciController = require('../controllers/costos_indirectos');
>>>>>>> 29a2f408269ca95f1f7c8d908faba3f88587f174

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

        // Metodos para la tabla categorias_c_a_sptn_ma:
        // Agregar 
        router.post('/cats/agregar',catsController.insert_cats);
        // Editar 
        router.put('/cats/edit/:id',catsController.update_cats);
        // Eliminar 
        router.delete('/cats/delete/:id',catsController.delete_cats);

/*--------------------------------------------------------------------------------------------------------------------*/

        // Metodos para la tabla cat_totales:
        // Agregar 
        router.post('/catt/agregar',cattController.insert_catt);
        // Editar 
        router.put('/catt/edit/:id',cattController.update_catt);
        // Eliminar 
        router.delete('/catt/delete/:id',cattController.delete_catt);

/*--------------------------------------------------------------------------------------------------------------------*/

        // Metodos para la tabla cat_cat_t:
        // Agregar 
        router.post('/cct/agregar',cctController.insert_cct);
        // Editar 
        router.put('/cct/edit/:id',cctController.update_cct);
        // Eliminar 
        router.delete('/cct/delete/:id',cctController.delete_cct);

/*--------------------------------------------------------------------------------------------------------------------*/
        
        // Metodos para la tabla proyectos_cat:
        // Agregar 
        router.post('/pc/agregar',pcController.insert_pc);
        // Editar 
        router.put('/pc/edit/:id',pcController.update_pc);
        // Eliminar 
        router.delete('/pc/delete/:id',pcController.delete_pc);

/*--------------------------------------------------------------------------------------------------------------------*/

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
<<<<<<< HEAD
/*=====TABLA DE PRECIO ========*/
// Metodos para la tabla precio:
=======

        // Metodos para la tabla precio:
>>>>>>> 29a2f408269ca95f1f7c8d908faba3f88587f174
        // Agregar 
        router.post('/precio/agregar',precioController.insert_precio);
        // Editar 
        router.put('/precio/edit/:id',precioController.update_precio);
        // Eliminar 
        router.delete('/precio/delete/:id',precioController.delete_precio);

/*--------------------------------------------------------------------------------------------------------------------*/
<<<<<<< HEAD
/*=====TABLA DE PROVEEDOR ========*/
// Metodos para la tabla proveedor:
=======

        // Metodos para la tabla proveedor:
>>>>>>> 29a2f408269ca95f1f7c8d908faba3f88587f174
        // Agregar 
        router.post('/proveedor/agregar',proveedorController.insert_prov);
        // Editar 
        router.put('/proveedor/edit/:id',proveedorController.update_prov);
        // Eliminar 
        router.delete('/proveedor/delete/:id',proveedorController.delete_prov);

/*--------------------------------------------------------------------------------------------------------------------*/
<<<<<<< HEAD
/*=====TABLA DE MARCA ========*/
// Metodos para la tabla marca:
=======

        // Metodos para la tabla marca:
>>>>>>> 29a2f408269ca95f1f7c8d908faba3f88587f174
        // Agregar 
        router.post('/marca/agregar',marcaController.insert_marca);
        // Editar 
        router.put('/marca/edit/:id',marcaController.update_marca);
        // Eliminar 
        router.delete('/marca/delete/:id',marcaController.delete_marca);

/*--------------------------------------------------------------------------------------------------------------------*/

        // Metodos para la tabla proveedor_marca:
        // Agregar 
        router.post('/pm/agregar',pmController.insert_pm);
        // Editar 
        router.put('/pm/edit/:id',pmController.update_pm);
        // Eliminar 
        router.delete('/pm/delete/:id',pmController.delete_pm);

/*--------------------------------------------------------------------------------------------------------------------*/

        // Metodos para la tabla moneda:
        // Agregar 
        router.post('/moneda/agregar',monedaController.insert_mon);
        // Editar 
        router.put('/moneda/edit/:id',monedaController.update_mon);
        // Eliminar 
        router.delete('/moneda/delete/:id',monedaController.delete_mon);

/*--------------------------------------------------------------------------------------------------------------------*/

<<<<<<< HEAD
         router.post('/am/agregar',amController.insertAm);
         router.post('/am/update/:id',amController.updateAm);
         router.delete('/am/dalete/:id',amController.deleteAm);
         
=======
        // Metodos para la tabla categoria:
        // Agregar 
        router.post('/cat/agregar',categoriaController.insert_cat);
        // Editar 
        router.put('/cat/edit/:id',categoriaController.update_cat);
        // Eliminar 
        router.delete('/cat/delete/:id',categoriaController.delete_cat);

/*--------------------------------------------------------------------------------------------------------------------*/

        // Metodos para la tabla am:
        //Agregar
        router.post('/am/agregar',amController.insert_am);
        //Editar
        router.put('/am/edit/:id',amController.update_am);
        //Eliminar
        router.delete('/am/delete/:id',amController.delete_am);

/*--------------------------------------------------------------------------------------------------------------------*/

        // Metodos para la tabla costos_indirectos:
        //Agregar
        router.post('/ci/agregar',ciController.insert_ci);
        //Editar
        router.put('/ci/edit/:id',ciController.update_ci);
        //Eliminar
        router.delete('/ci/delete/:id',ciController.delete_ci);

>>>>>>> 29a2f408269ca95f1f7c8d908faba3f88587f174
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