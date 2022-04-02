const {response} = require("express");
const pool = require("../src/db");
const catd = {};

//Función para agregar atributos en la tabla cat_totales---------------------------------------------------
catd.insert_catd = async (req,res) =>{
    const {proyecto_id} = req.params;
    const new_catt = { 
      cd_id_cats,
      cd_no_parte,
      cd_descripcion,
      cd_meses,
      cd_semanas,
      cd_comentarios
    } = req.body;
    //new_catt.ct_totales_mxn= 1000.20; //Dato para prueba
    const resCatId = await pool.query('INSERT INTO categorias_datos SET ?', [new_catt]);

    const new_pc= {
      pc_id_proyecto: proyecto_id,
      pc_id_cat_d: resCatId.insertId
    }
    await pool.query('INSERT INTO proyectos_cat_d SET ?', [new_pc]); 
      
    res.json({
        data:resCatId,
        msg: "Total de la categoria agregado exitosamente",
        estado: true,
      });
}
//---------------------------------------------------------------------------------------------------------

//Función para editar atributos en la tabla cat_totales---------------------------------------------------
catd.update_catt = async (req, res) => {
    const { 
        ct_id,// = 3, //Dato para prueba
        new_ct_id_moneda
    } = req.params;

    const edit_catt = { 
        ct_totales,
        ct_id_moneda: new_ct_id_moneda
    } = req.body;
    //edit_catt.ct_id_moneda = 2; //Dato para prueba
    await pool.query("UPDATE cat_totales set ?  WHERE ct_id = ?", [edit_catt, ct_id]);
    res.json({
      msg: "Total de la categoria editado exitosamente",
      estado: true,
    });
  };
//--------------------------------------------------------------------------------------------------------

//Función para eliminar atributos en la tabla cat_totales---------------------------------------------------
catd.delete_catt = async (req, res) => {
    //const { ct_id = 3 } = req.params; //Dato para prueba
    const { ct_id } = req.params;
    await pool.query("DELETE FROM cat_totales WHERE ct_id = ?", [ ct_id]);
    res.json({
      msg: "Total de la categoria eliminado exitosamente",
      estado: true,
    });
  };
//----------------------------------------------------------------------------------------------------------
// Funcion de ver los atributos de las tablas de proyectos_cat_cat_t, categorias_c_a_sptn_ma, cat_totales
catd.view_catd = async (req,res) => {
  const {proyecto_id} = req.params;
  console.log(req.params)
  const reSql = await pool.query ( "SELECT proyecto_clave, pc_id, cd_id,cd_id_cats,cd_no_parte,cd_descripcion,cd_semanas,cd_meses,cd_cantidad,cd_id_precio,cd_comentarios, cat_id, cat_nombre, precio_lista, precio_unitario, precio_descuento, precio_total, precio_id_moneda, moneda_nombre "
  + "FROM proyecto "
  + "RIGHT JOIN proyectos_cat_d ON proyecto_id = pc_id_proyecto "
  + "RIGHT JOIN categorias_datos ON pc_id_cat_d = cd_id "
  + "RIGHT JOIN categorias_c_a_sptn_ma ON cd_id_cats = cat_id "
  + "RIGHT JOIN precio ON cd_id_precio = precio_id "
  + "RIGHT JOIN moneda ON precio_id_moneda = moneda_id "
  + "WHERE proyecto_id = ?", [proyecto_id]);
  res.json({data:reSql})
  console.log(reSql)

}

module.exports = catd;