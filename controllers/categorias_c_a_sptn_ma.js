const { response } = require("express");
const pool = require("../src/db");
const categorias = {};

/*================================================ CRUD - Tabla categorias_c_a_sptn_ma ================================================*/
/*========================== Create ==========================*/

/*============================================================*/

/*========================== Read ==========================*/
//Función para consultar los datos de las categorias de un determinado proyecto
categorias.viewCatsD = async (req,res) => {
  const {proyecto_id} = req.params;
  const reSql = await pool.query ( 
    "SELECT cd_id,cd_id_cats,cat_nombre,cd_no_parte,cd_descripcion,cd_semanas,cd_meses,cd_comentarios " 
  + "FROM proyecto "
  + "RIGHT JOIN proyectos_cat_d ON proyecto_id = pc_id_proyecto "
  + "RIGHT JOIN categorias_datos ON pc_id_cat_d = cd_id "
  + "RIGHT JOIN categorias_c_a_sptn_ma ON cd_id_cats = cat_id "
  + "WHERE proyecto_id = ? "
  + "ORDER BY cd_id_cats", [proyecto_id]);
  res.json({data:reSql})
};
/*==========================================================*/

/*========================== Update ==========================*/

/*============================================================*/

/*========================== Delete ==========================*/

/*============================================================*/
module.exports = categorias;
/*=====================================================================================================================================*/