const { response } = require("express");
const pool = require("../src/db");
const catt = {};

//Función para agregar atributos en la tabla cat_totales---------------------------------------------------
catt.insert_catt = async (req,res) =>{
    const {new_cat_id_moneda} = req.params;
    const new_catt = { 
        ct_totales,
        ct_id_moneda: new_cat_id_moneda
    } = req.body;
    //new_catt.ct_totales = 1000.20; //Dato para prueba
    //new_catt.ct_id_moneda = 1; //Dato para prueba
    const cat_id = await pool.query('INSERT INTO cat_totales SET ?', [new_catt]);
    res.json({
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

module.exports = catt;