const express= require('express')
const router = express.Router();
const {postForm , viewForm ,deleteForm , editForm , editPass} = require('../controllers/usuario');
const {getForm} = require('../controllers/login');
const pool = require('../src/db');
const partidaController = require('../controllers/Partida');
const clientesController= require('../controllers/clientes');
const spController = require('../controllers/servicios_productos');
const precioController = require ('../controllers/precio');
const monedaController = require ('../controllers/moneda');
const proveedorController = require ('../controllers/proveedor');
const marcaController = require ('../controllers/marca');
const pmController = require ('../controllers/proveedor_marca');
const proyectosController= require('../controllers/proyecto');
const catsController = require ('../controllers/categorias_c_a_sptn_ma');
const cattController = require ('../controllers/cat_totales');
const amController=  require('../controllers/am');
const colaboradoresController =require('../controllers/colaboradores');

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
        router.delete('/delete/:id',deleteForm);  
        // ruta para editar los parametros en base Id
        router.put('/edit/:id', editForm);  
        // ruta para editar el password en base Id
        router.put('/edit/pass/:id', editPass);         

/*--------------------------------------------------------------------------------------------------------------*/
/*=====TABLA DE PARITDA ========*/

// metodos para agrgar datos eliminar datos y modificar datos de tabla proyecto  
        // ruta para agregar datos a tabla por post        
        router.post('/partida/:id',partidaController.insertPartida);
        //ruta para modificar datos de tabla ptmBom
        router.put('/partida/update/:id',partidaController.updatePartida);
         //ruta para eliminar datos de tabla ptmBom
        router.delete('/partida/delete/:id',partidaController.deletePartida);
        //Consultar datos de una partida de un deteterminado proyecto
        router.get('/partida/viewPP/:proyecto_id',partidaController.viewPartida);
        

/*--------------------------------------------------------------------------------------------------------------*/
/*=====TABLA DE CLIENTES ========*/

         //agregar datos  clientes
        router.post('/clientes/agregar',clientesController.postClientes);
         // modificar clientes
        router.put('/clientes/update/:id',clientesController.updateClientes);        
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
         //ruta vizualizar proyecto
         router.get('/proyecto/view',proyectosController.viewProyecto);
         router.get('/proyecto/view1',proyectosController.viewProyectoWithNcliente);
/*--------------------------------------------------------------------------------------------------------------------*/
/*===== TABLA DE COLABORADORES ========*/

        router.post('/colaboradores/:id',colaboradoresController.insertColaborador);

/*--------------------------------------------------------------------------------------------------------------------*/

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
        router.post('/catt/agregar/:cat_id/:proyecto_id',cattController.insert_catt);
        // Editar 
        router.put('/catt/edit/:id',cattController.update_catt);
        // Eliminar 
        router.delete('/catt/delete/:id',cattController.delete_catt);

/*--------------------------------------------------------------------------------------------------------------------*/
/*=====TABLA DE SERVIVCIO_PRODUCTO ========*/
        // Metodos para la tabla servicio_producto:
        // Agregar 
        router.post('/sp/agregar/:id',spController.insert_sp);
        // Editar 
        router.put('/sp/edit/:id',spController.update_sp);
        // Eliminar 
        router.delete('/sp/delete/:id',spController.delete_sp);
        //Consultar datos de un servicio
        router.get('/partida/viewPSP/:partida_id',spController.viewPSP);

/*--------------------------------------------------------------------------------------------------------------------*/
/*=====TABLA DE PRECIO ========*/
// Metodos para la tabla precio:
        // Agregar 
        router.post('/precio/agregar',precioController.insert_precio);
        // Editar 
        router.put('/precio/edit/:id',precioController.update_precio);
        // Eliminar 
        router.delete('/precio/delete/:id',precioController.delete_precio);
        //Consultar precios de un servicio_producto
        router.get('/precio/viewSPP/:sp_id',precioController.viewSPP);
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
        router.post('/marca/agregar/:proveedor_id',marcaController.insert_marca);
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

        // Metodos para la tabla am:
        //Agregar
        router.post('/am/agregar/:id',amController.insert_am);
        //Editar
        router.put('/am/edit/:id',amController.update_am);
        //Eliminar
        router.delete('/am/delete/:id',amController.delete_am);
         
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