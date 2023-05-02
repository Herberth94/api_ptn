const express= require('express')
const router = express.Router();
const {postForm , viewForm, viewForm1,viewUsersVenta , viewUsersVentaP, deleteForm, editForm , editPass} = require('../controllers/usuario');
const {getForm} = require('../controllers/login');
const pool = require('../src/db');
const partidaController = require('../controllers/Partida');
const clientesController= require('../controllers/clientes');
const spController = require('../controllers/servicios_productos');
const precioController = require ('../controllers/precio');
const monedaController = require ('../controllers/moneda');
const proveedorController = require ('../controllers/proveedor');
const marcaController = require ('../controllers/marca');
const sppmController = require ('../controllers/sp_proveedor_marca');
const proyectosController= require('../controllers/proyecto');
const catsController = require ('../controllers/categorias_c_a_sptn_ma');
const cattController = require ('../controllers/categorias_datos');
const amController=  require('../controllers/am');
const colaboradoresController =require('../controllers/colaboradores');
const ciController = require('../controllers/costos_indirectos');
const proporcionalidadController = require('../controllers/proporcionalidad');
const categiriasMaController = require('../controllers/categorias_c_a_sptn_ma');

const { route } = require('express/lib/application');
const categorias = require('../controllers/categorias_c_a_sptn_ma');
const categoria = require('../controllers/categoria');

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
        router.get('/users/view',viewForm1);
        //Ruta para obtener los usuarios de venta
        router.get('/viewUsersVenta',viewUsersVenta);  
        //Ruta para obtener los usuarios de venta de un determinado proyecto
        router.get('/viewUsersVentaP/:proyecto_id',viewUsersVentaP);
        //eliminación de registro de usuario tomando cuenta el id
        router.delete('/delete/:id',deleteForm);  
        // ruta para editar los parametros en base Id
        router.post('/edit/:id', editForm);  
        // ruta para editar el password en base Id
        router.post('/edit/pass/:id', editPass);         

/*--------------------------------------------------------------------------------------------------------------*/
/*=====TABLA DE PARTIDA ========*/

// metodos para agrgar datos eliminar datos y modificar datos de tabla proyecto  
        // ruta para agregar datos a tabla por post        
        router.post('/partida/:id',partidaController.insertPartida);
        //ruta para modificar datos de tabla ptmBom
        router.put('/partida/update/:id',partidaController.updatePartida);
         //ruta para eliminar datos de tabla ptmBom
        router.delete('/partida/delete/:id',partidaController.deletePartida);
        //Consultar datos de la tabla partida
        router.get('/partida/viewPU/:id_usuario',partidaController.viewPartida_UP);
        //Consultar datos de una partida de un deteterminado proyecto
        router.get('/partida/viewPP/:proyecto_id',partidaController.viewPartidaPP);
        

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

         //rutas para  agregar proyecto 
        router.post('/proyecto/agregar/:id',proyectosController.insertProyectos);
         // ruta para modificar proyectos
        router.post('/proyecto/update/:id',proyectosController.updateProyectos);
                // ruta para modificar el estatus de un proyecto finalizado
                router.put('/proyecto/updateEstatus/:proyecto_id',proyectosController.UpdateStatusProyectos);
                // ruta para modificar la divisa de un proyecto 
                router.put('/proyecto/updateDiv/:proyecto_id',proyectosController.UpdateDivisa);
                // ruta para modificar la Fecha de modificacion de un proyecto 
                router.put('/proyecto/updateFM/:proyecto_id',proyectosController.UpdateFechaMod);
         //ruta  eliminar  proyecto
        router.delete('/proyecto/delete/:id',proyectosController.deleteProyectos);
         //ruta vizualizar proyecto
         router.get('/proyecto/viewadmin',proyectosController.viewAdmin);
         router.get('/proyecto/viewpreventas/:usuario_id',proyectosController.viewVentas);
         // Ruta modal
         router.get('/proyecto/viewModal/:proyecto_id',proyectosController.viewModal);
         //ruta para asignar un proyecto a un usuario de ventas
         router.post('/proyecto/insertUsuariosProyectos', proyectosController.insertUsuariosProyectos) 
         // ruta - Vizualizar todos los datos de un proyecto
         router.get('/proyecto/viewPlantilla/:proyecto_id',proyectosController.viewPlantilla); 
/*--------------------------------------------------------------------------------------------------------------------*/
        /*======================== Rutas CRUD para la tabla colaboradores ======================== */
        //Create
        router.post('/colaboradores/insert',colaboradoresController.insertColaborador);
        //Read
        router.get('/colaboradores/viewProyectos/:id_usuario', colaboradoresController.viewProyColab);
        router.get('/colaboradores/view/:proyecto_id', colaboradoresController.viewColab);
        //Update
        //Delete
        router.delete('/colaboradores/delete/:colab_id', colaboradoresController.deleteProyectos)

/*--------------------------------------------------------------------------------------------------------------------*/
       
        /*======================== Rutas CRUD para la tabla categorias_c_a_sptn_ma ======================== */
        //Create
        //Read
        router.get('/categoriasma/view',categiriasMaController.viewCategoriasMa);
        //Update
        //Delete
        //Update
        //Delete

/*--------------------------------------------------------------------------------------------------------------------*/

        /*======================== Rutas CRUD para la tabla categorias_datos ======================== */
        //Create
                router.post('/catd/agregar/:proyecto_id',cattController.insertCatsD);
                //Carga muliple 
                router.post('/catd/multiInsert/:proyecto_id',cattController.multiCD);
        //Read
                //Todos los datos
                router.get('/catd/view/:proyecto_id', cattController.viewCatsD);
                //No. de partes
                router.get('/catd/viewNP', cattController.viewDataCatsNP);
                //Descripciones
                router.get('/catd/viewDes', cattController.viewDataCatsDes);
        //Update
        router.post('/catd/edit/:cd_id', cattController.updateCatsD);
        router.post('/catd/editCant/:cd_id', cattController.updateCdCant);
        router.get('/catd/view/modal/:proyecto_id', cattController.ModalCt);
        //Delete

/*--------------------------------------------------------------------------------------------------------------------*/
        /*======================== Rutas CRUD para la tabla servicio_productos ======================== */
        /*=== Create ===*/
        // Inserción a la tabla servicio_producto y sp_proveedor_marca
        router.post('/sp/agregar/:partida_id/:proveedor_id/:marca_id',spController.insert_sp);
        //Inserción multiple Excel
        router.post('/sp/insertExcel/:proyecto_id',spController.cargaExcel);
        //Inserción múltiple 
        router.post('/sp/insercionMultiple/:partida_id',spController.multiSP);
        // Inserción a la tabla sp_no_parte
        router.post('/sp/agregarSpnp',spController.insert_spnp);
        // Inserción a la tabla sp_descripcion
        router.post('/sp/agregarSpd',spController.insert_spd);
        /*=============*/

        /*=== Read ===*/
        // Consulta de los servicios/productos de una partida
        router.get('/sp/viewPSP/:partida_id',spController.viewPSP);
        // Consulta de todos los servicios/productos existentes 
        router.get('/sp/viewFindSP',spController.viewFindSP);
        // Consulta de todos los no de parte
        router.get('/sp/viewSpnp',spController.viewSpnp);
        // Consulta de todas las descripciones
        router.get('/sp/viewSpd',spController.viewSpd);
        // Consulta de todas las categorias de servicios y productos
        router.get('/categoriassp/view',categoria.view_cat_sp);

        /*============*/

        /*=== Update ===*/
        // Edición a la tabla servicio_producto y sp_proveedor_marca
        router.post('/sp/edit/:sp_id/:sppm_id_proveedor/:sppm_id_marca',spController.update_sp);
        // Edición a la columna sp_cantidad de la tabla servicio_producto
        router.post('/sp/editCant/:sp_id',spController.update_sp_cant);
        /*==============*/

        // Delete 
        router.delete('/sp/delete/:id',spController.delete_sp);
        /*============================================================================================= */

/*--------------------------------------------------------------------------------------------------------------------*/

        /*======================== Rutas CRUD para la tabla precio ======================== */
        //Create
        router.post('/precio/agregar',precioController.insertPrecio);
        //Read
        router.get('/precio/viewSPP/:sp_id',precioController.viewSPP);
        router.get('/precio/viewCatsDP/:cd_id',precioController.viewCatsDP);
        //Update
        router.post('/precio/edit/:precio_id',precioController.updatePrecio);
        //Delete
        router.delete('/precio/delete/:precio_id',precioController.deletePrecio);

/*--------------------------------------------------------------------------------------------------------------------*/
/*=====TABLA DE PROVEEDOR ========*/
// Metodos para la tabla proveedor:
        // Agregar 
        router.post('/proveedor/agregar',proveedorController.insert_prov);
        // Editar 
        router.post('/proveedor/edit/:proveedor_id',proveedorController.update_prov);
        // Eliminar 
        router.delete('/proveedor/delete/:id',proveedorController.delete_prov);
        // Consultar
        router.get('/proveedor/view',proveedorController.view_prov)

/*--------------------------------------------------------------------------------------------------------------------*/
/*=====TABLA DE MARCA ========*/
// Metodos para la tabla marca:
        // Agregar 
        router.post('/marca/agregar/:proveedor_id',marcaController.insert_marca);
        router.post('/marca/agregarPM/:proveedor_id/:marca_id',marcaController.insert_provMarca);
        // Editar 
        router.post('/marca/edit/:marca_id',marcaController.update_marca);
        // Eliminar 
        router.delete('/marca/delete/:id',marcaController.delete_marca);
        // Consultar
        router.get('/marca/view',marcaController.viewMarcas);
        router.get('/provmarcas/view/:proveedor_id',marcaController.viewProvMarca);
/*--------------------------------------------------------------------------------------------------------------------*/

        // Metodos para la tabla sp_proveedor_marca:
        // Agregar 
        //router.post('/sppm/agregar',sppmController.insert_sppm);
        // Editar 
        //router.put('/pm/edit/:id',pmController.update_pm);
        // Eliminar 
        router.delete('/sppm/delete/:id',sppmController.delete_sppm);

/*--------------------------------------------------------------------------------------------------------------------*/

        // Metodos para la tabla moneda:
        // Agregar 
        router.post('/moneda/agregar',monedaController.insert_mon);
        // Editar 
        router.put('/moneda/edit/:id',monedaController.update_mon);
        // Eliminar 
        router.delete('/moneda/delete/:id',monedaController.delete_mon);

/*--------------------------------------------------------------------------------------------------------------------*/

        /*================================== Rutas CRUD para la tabla am ================================== */
        //Create
        router.post('/am/AgregarAMPartidas/:partida_id',amController.insertAMPartidas);
        router.post('/am/AgregarAMCategorias/:proyecto_id/:cats_id',amController.insertAMCategorias);
        //Read
        router.get('/am/viewTotalesPartidas/:proyecto_id', amController.viewTotalesPartida);
        router.get('/am/viewAMPartidas/:proyecto_id', amController.viewDatosAMPartida);
        router.get('/am/viewTotalesCategorias/:proyecto_id', amController.viewTotalesCategorias);
        router.get('/am/viewAMCategorias/:proyecto_id', amController.viewAMCategorias);
        router.get('/am/viewDivisa/:proyecto_id',amController.viewDivisa)
        //Update
        router.post('/am/EditAMPar/:am_id',amController.updateAMPar);
        router.post('/am/EditAMCats/:amc_id',amController.updateAMCats);
        //Delete
         
/*--------------------------------------------------------------------------------------------------------------------*/

        /*=========================== Rutas CRUD para la tabla costos_indirectos ========================== */
        //Create
        router.post('/ci/agregar/:ci_id_cci/:ci_porcentaje/:ci_id_proyecto',ciController.insert_ci);
        //Read
        router.get('/ci/view/:proyecto_id',ciController.viewCIP);
        //Update
        router.post('/ci/edit/:ci_id',ciController.update_ci);
        //Delete

/*--------------------------------------------------------------------------------------------------------------------*/

        /*=========================== Rutas CRUD para la tabla proporcionalidad =========================== */
        //Create
        router.post('/proporcionalidad/insert/:idProyecto',proporcionalidadController.insertProporcionalidad);
        //Read
        router.get('/proporcionalidad/view/:idProyecto',proporcionalidadController.viewdpropd);
        //Update
        router.put('/proporcionalidad/update/:idProyecto',proporcionalidadController.updateProporcionalidad);
        //Delete

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