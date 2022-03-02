const { response } = require("express");
const pool = require("../src/db");
const proveedor = {};

//Función para agregar atributos en la tabla proveedor---------------------------------------------------
proveedor.insert_prov = async (req,res) =>{
  const new_proveedor = {
    proveedor_nombre,
    provedor_telefono,
    proveedor_compania, 
  } = req.body;
  //new_proveedor.proveedor_nombre = "PTN"; //Dato prueba para inserción
  const proveedor_id = await pool.query('INSERT INTO proveedor SET ?', [new_proveedor]); 
  //Obtención del atributo proveedor_id en la tablas proveedor y marca, respectivamente
  //  const new_pm_id_proveedor = {
  //   pm_id_proveedor: proveedor_id.insertId
  // }
  res.json({
    msg: "Proveedor agregado exitosamente",
    estado: true,
  });
}
//-------------------------------------------------------------------------------------------------------

//Función para editar atributos en la tabla proveedor---------------------------------------------------
proveedor.update_prov = async (req, res) => {
  //const { proveedor_id = 3 } = req.params; //Prueba para editar datos
  const { proveedor_id } = req.params;
  const edit_prov = {
    proveedor_nombre,
    provedor_telefono,
    proveedor_compania, 
  } = req.body;
  //edit_prov.proveedor_nombre = "PTNNNN"; //Prueba para editar datos
  await pool.query("UPDATE proveedor set ?  WHERE proveedor_id = ?", [edit_prov, proveedor_id]);
  res.json({
    msg: "Proveedor editado exitosamente",
    estado: true,
  });
};
//------------------------------------------------------------------------------------------------------

//Función para eliminar atributos en la tabla proveedor---------------------------------------------------
proveedor.delete_prov = async (req, res) => {
  //const { proveedor_id = 3 } = req.params; //Prueba de eliminación de datos
  const { proveedor_id } = req.params;
  await pool.query("DELETE FROM proveedor WHERE proveedor_id = ?", [proveedor_id]);
  res.json({
    msg: "Producto eliminado exitosamente",
    estado: true,
  });
};
//--------------------------------------------------------------------------------------------------------
module.exports = proveedor;