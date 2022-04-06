const pool = require('../src/db');
const { response } = require('express');
const am = {};

/*==================================================== CRUD - Tabla am y am_cats ====================================================*/
/*========================== Create ==========================*/
//Función para agregar atributos en la tabla am
am.insertAMPartidas = async (req, res) => {
        const { partida_id } = req.params;
        const dataAMPar = {
                am_id_partida:partida_id,
        } 

        await pool.query('INSERT INTO am SET ?', [dataAMPar]);
        res.json({
                msg: "AM agregado exitosamente",
                estado: true,
        });
};
//Función para agregar atributos en la tabla am_cats
am.insertAMCategorias = async (req, res) => {
        const {proyecto_id,cats_id} = req.params;
        const dataAMCats = {
                amc_id_proyecto:proyecto_id,
                amc_id_cats:cats_id
        } 
        await pool.query('INSERT INTO am_cats SET ?', [dataAMCats]);
        res.json({
                msg: "AM agregado exitosamente",
                estado: true,
        });
};
/*============================================================*/

/*========================== Read ==========================*/
//Función para consultar los datos de las partidas de un determinado proyecto para realizar los cálculos AM
am.viewTotalesPartida = async (req,res) => {
        const{proyecto_id} = req.params;
        const reSql = await pool.query(
          "SELECT partida_id,partida_nombre,partida_descripcion,sp_cantidad,sp_id_precio, precio_total,"
        + "precio_id_moneda,moneda_nombre,precio_unitario, precio_lista,precio_descuento "
        + "FROM proyecto "
        + "RIGHT JOIN pp ON pp_id_proyecto = proyecto_id "
        + "RIGHT JOIN partida ON pp_id_partida = partida_id "
        + "RIGHT JOIN psp ON partida_id = psp_id_partida "
        + "RIGHT JOIN servicio_producto ON psp_id_sp = sp_id "
        + "RIGHT JOIN precio ON sp_id_precio = precio_id "
        + "RIGHT JOIN moneda ON moneda_id = precio_id_moneda "
        + "WHERE proyecto_id = ? "
        + "ORDER BY partida_id", [proyecto_id]);
        res.json({data:reSql});
};

//Función para consultar los datos am de cada partida de un determinado proyecto para realizar los cálculos AM
am.viewDatosAMPartida = async (req,res) => {
        const{proyecto_id} = req.params;
        const reSql = await pool.query(
          "SELECT partida_id,partida_nombre,partida_descripcion,am_desc_cliente,am_margen_ganancia,am_cantidad,am_descuento_fabrica "
        + "FROM proyecto "
        + "RIGHT JOIN pp ON pp_id_proyecto = proyecto_id "
        + "RIGHT JOIN partida ON pp_id_partida = partida_id "
        + "RIGHT JOIN am ON am_id_partida = partida_id "
        + "WHERE proyecto_id = ? "
        + "ORDER BY partida_id", [proyecto_id]);
        res.json({data:reSql});
};

//Función para consultar los datos de las categorias de un determinado proyecto para los cálculos de AM
am.viewTotalesCategorias = async (req,res) => {
        const {proyecto_id} = req.params;
        const reSql = await pool.query ( 
          "SELECT cd_id_cats,cat_nombre,cd_no_parte,cd_descripcion,cd_semanas,cd_meses,cd_cantidad,cd_comentarios,precio_lista," 
        + "precio_unitario,precio_descuento,precio_total,precio_id_moneda,moneda_nombre "
        + "FROM proyecto "
        + "RIGHT JOIN proyectos_cat_d ON proyecto_id = pc_id_proyecto "
        + "RIGHT JOIN categorias_datos ON pc_id_cat_d = cd_id "
        + "RIGHT JOIN categorias_c_a_sptn_ma ON cd_id_cats = cat_id "
        + "RIGHT JOIN precio ON cd_id_precio = precio_id "
        + "RIGHT JOIN moneda ON precio_id_moneda = moneda_id "
        + "WHERE proyecto_id = ? "
        + "ORDER BY cd_id_cats", [proyecto_id]);
        res.json({data:reSql})
        //console.log(reSql)
};

//Función para consultar los datos am de cada partida de un determinado proyecto para realizar los cálculos AM
am.viewAMCategorias = async (req,res) => {
        const {proyecto_id} = req.params;
        const reSql = await pool.query ( 
          "SELECT cat_id,cat_nombre,amc_desc_cliente,amc_margen_ganancia,amc_cantidad,amc_desc_fabrica " 
        + "FROM proyecto "
        + "RIGHT JOIN am_cats ON amc_id_proyecto = proyecto_id "
        + "RIGHT JOIN categorias_c_a_sptn_ma ON amc_id_cats = cat_id "
        + "WHERE proyecto_id = ? "
        + "ORDER BY cat_id", [proyecto_id]);
        res.json({data:reSql})
};

//Función para consultar el dato de divisa de un determinado proyecto para realizar los cálculos AM
am.viewDivisa = async (req,res) => {
        const {proyecto_id} = req.params;
        const reSql = await pool.query("SELECT proyecto_plazo_meses,proyecto_valor_dolar FROM proyecto WHERE proyecto_id = ? ",[proyecto_id]);
        res.json({data:reSql})
};
/*==========================================================*/

/*========================== Update ==========================*/
//Función para editar atributos en la tabla am
am.update_am = async (req, res) => {
        const {
                am_id, //= 1,
                new_id_proyecto
        } = req.params;
        const edit_am = {
                am_valor_dolar,
                am_desc_cliente,
                am_margen_ganancia,
                am_desc_fabrica,
                am_id_proyecto: new_id_proyecto
        } = req.body;
        //edit_am.am_valor_dolar = 20.20;
        //edit_am.am_id_proyecto = 2;
        await pool.query("UPDATE am set ?  WHERE am_id = ?", [edit_am, am_id]);
        res.json({
                msg: "AM editado exitosamente",
                estado: true,
        });
};
/*============================================================*/

/*========================== Delete ==========================*/
//Función para eliminar atributos en la tabla am
// am.delete_am = async (req, res) => {
//         //const { am_id = 1 } = req.params; //Dato para prueba
//         const { am_id } = req.params;
//         await pool.query("DELETE FROM am WHERE am_id = ?", [am_id]);
//         res.json({
//                 msg: "AM eliminado exitosamente",
//                 estado: true,
//         });
// };
/*============================================================*/
module.exports = am;
/*===================================================================================================================================*/