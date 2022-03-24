const { response } = require("express");
const pool = require("../src/db");
const catt = {};

//Función para agregar atributos en la tabla cat_totales---------------------------------------------------
catt.insert_catt = async (req,res) =>{
    const {cat_id,proyecto_id} = req.params;
    const new_catt = { 
      ct_totales_mxn,
      ct_totales_usd
    } = req.body;
    //new_catt.ct_totales_mxn= 1000.20; //Dato para prueba
    const resCatId = await pool.query('INSERT INTO cat_totales SET ?', [new_catt]);

    const new_pc= {
      pc_id_proyecto: proyecto_id,
      pc_id_cat: cat_id,
      pc_id_cat_t: resCatId.insertId
    }
    await pool.query('INSERT INTO proyectos_cat_cat_t SET ?', [new_pc]); 
      
    res.json({
        data:resCatId,
        msg: "Total de la categoria agregado exitosamente",
        estado: true,
      });
}
//---------------------------------------------------------------------------------------------------------

//Función para editar atributos en la tabla cat_totales---------------------------------------------------
catt.update_catt = async (req, res) => {
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
catt.delete_catt = async (req, res) => {
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
catt.view_catt = async (req,res) => {
  const {proyecto_id} = req.params;
  console.log(req.params)
  const reSql = await pool.query ("SELECT pc_id,pc_id_proyecto, proyecto_clave , cat_id , cat_nombre, pc_id_cat_t, ct_totales_mxn , ct_totales_usd "
  + "FROM proyectos_cat_cat_t "
  + "RIGHT JOIN proyecto ON pc_id_proyecto = proyecto_id "
  + "RIGHT JOIN categorias_c_a_sptn_ma ON pc_id_cat = cat_id "
  + "RIGHT JOIN cat_totales ON pc_id_cat_t = ct_id "
  + "WHERE proyecto_id = ? ", [proyecto_id]);
  res.json({data:reSql})
  console.log(reSql)

}

module.exports = catt;