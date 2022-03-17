const { response } = require("express");
const pool = require("../src/db");
const precio = {};

//Función para agregar atributos en la tabla precio---------------------------------------------------
precio.insert_precio = async (req, res) => {
  const { sp_id } = req.params;
  const new_precio = {
    precio_lista,
    precio_unitario,
    precio_descuento, 
    precio_total,
    precio_id_moneda
  } = req.body;
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

/*== Función para consultar datos relacionados de un determinado servicio_producto ==*/
precio.viewSPP = async (req, res) => {
  const {sp_id} = req.params;
  const reSql = await pool.query(
    "SELECT precio_id, precio_lista, precio_unitario, precio_descuento, precio_total, moneda_nombre "
    +"FROM servicio_producto "
    +"RIGHT JOIN sp_precio ON spp_id_sp = sp_id "
    +"RIGHT JOIN precio ON spp_id_precio = precio_id "
    +"LEFT JOIN moneda ON precio_id_moneda = moneda_id "
    +"WHERE sp_id = ? "
    +"ORDER BY precio_id", [sp_id]);
  res.json({data:reSql});
  //console.log(reSql);
};

module.exports = precio;