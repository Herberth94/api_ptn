const { response } = require("express");
const pool = require("../src/db");
const moneda = {};

//Función para agregar atributos en la tabla marca---------------------------------------------------
moneda.insert_mon = async (req, res) => {
    const new_mon = { moneda_nombre} = req.body;
    //new_mon.moneda_nombre = 'MXN'; //Dato para prueba
    const cat_id = await pool.query('INSERT INTO moneda SET ?', [new_mon]);
    res.json({
        msg: "Moneda agregada exitosamente",
        estado: true,
      });
}
//---------------------------------------------------------------------------------------------------

//Función para editar atributos en la tabla moneda---------------------------------------------------
moneda.update_mon = async (req, res) => {
    const { moneda_id } = req.params;
    //const { moneda_id = 3} = req.params; //Dato para prueba
    const edit_mon = { moneda_nombre } = req.body;
    //edit_mon.moneda_nombre = "USD"; //Dato para prueba
    await pool.query("UPDATE moneda set ?  WHERE moneda_id = ?", [edit_mon, moneda_id]);
    res.json({
      msg: "Moneda editada exitosamente",
      estado: true,
    });
  };
//--------------------------------------------------------------------------------------------------

//Función para eliminar atributos en la tabla marca---------------------------------------------------
moneda.delete_mon = async (req, res) => {
    //const { moneda_id = 3 } = req.params; //Dato para prueba
    const { moneda_id } = req.params;
    await pool.query("DELETE FROM moneda WHERE moneda_id = ?", [ moneda_id]);
    res.json({
      msg: "Moneda eliminada exitosamente",
      estado: true,
    });
  };
//----------------------------------------------------------------------------------------------------

module.exports = moneda;