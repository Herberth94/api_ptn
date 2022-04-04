const {response} = require("express");
const pool = require("../src/db");
const catd = {};

/*==================================================== CRUD - Tabla categorias_datos ====================================================*/
/*========================== Create ==========================*/
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
/*============================================================*/

/*========================== Read ==========================*/

/*==========================================================*/

/*========================== Update ==========================*/
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
/*============================================================*/

/*========================== Delete ==========================*/
// catd.delete_catt = async (req, res) => {
//   const { ct_id } = req.params;
//   await pool.query("DELETE FROM cat_totales WHERE ct_id = ?", [ ct_id]);
//   res.json({
//     msg: "Total de la categoria eliminado exitosamente",
//     estado: true,
//   });
// };
/*============================================================*/
module.exports = catd;
/*=======================================================================================================================================*/