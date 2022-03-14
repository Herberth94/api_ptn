const { response } = require("express");
const pool = require("../src/db");
const precio = {};

//Función para agregar atributos en la tabla precio---------------------------------------------------
precio.insert_precio = async (req, res) => {
  // const { new_precio_id_moneda } = req.params;
  const new_precio = {
    precio_lista,
    precio_unitario,
    precio_descuento, 
    precio_total,
    precio_id_moneda
    // precio_id_moneda: new_precio_id_moneda
  } = req.body;
  //console.log(req.body)
  const precio_id = await pool.query('INSERT INTO precio SET ?', [new_precio]);
  res.json({
    data: precio_id,
    msg: "Precio agregado exitosamente",
    estado: true,
  });
}
//----------------------------------------------------------------------------------------------------

//Función para editar atributos en la tabla precio---------------------------------------------------
precio.update_precio = async (req, res) => {
  //const { precio_id = 22 } = req.params; //Prueba para editar datos
  const { precio_id, new_precio_id_moneda } = req.params;
  const edit_precio = {
    precio_lista,
    precio_unitario,
    precio_descuento, 
    precio_id_moneda: new_precio_id_moneda
  } = req.body;
  //edit_precio.precio_lista = 20.25; //Prueba para editar datos
  //edit_precio.precio_id_moneda = 2; //Prueba para editar datos
  await pool.query("UPDATE precio set ?  WHERE precio_id = ?", [edit_precio, precio_id]);
  res.json({
    msg: "Precio agregado exitosamente",
    estado: true,
  });
};
//---------------------------------------------------------------------------------------------------

//Función para eliminar atributos en la tabla precio---------------------------------------------------
precio.delete_precio = async (req, res) => {
  const { precio_id} = req.params; 
  //const { precio_id = 21} = req.params; //Prueba de eliminación de datos
  await pool.query("DELETE FROM precio WHERE precio_id = ?", [precio_id]);
  res.json({
    msg: "Precio eliminado exitosamente",
    estado: true,
  });
};
//-----------------------------------------------------------------------------------------------------

module.exports = precio;