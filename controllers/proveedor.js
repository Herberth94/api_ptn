const { response } = require("express");
const pool = require("../src/db");
const proveedor = {};

//Función para agregar atributos en la tabla proveedor---------------------------------------------------
proveedor.insert_prov = async (req, res) => {
  const new_proveedor = req.body;
  var err;
  try {
    const resProv = await pool.query('INSERT INTO proveedor SET ?', [new_proveedor]);
    res.json({
      data: resProv,
      msg: "Proveedor agregado exitosamente",
      estado: true,
    });

  } catch (error) {
    console.log("Error identificado:", error);
    err = error;

    res.json({
      msg: 'Error al insertar un nuevo colaborador',
      error: err
    });

  }
}
//-------------------------------------------------------------------------------------------------------

//Función para editar atributos en la tabla proveedor---------------------------------------------------
proveedor.update_prov = async (req, res) => {
  //const { proveedor_id = 3 } = req.params; //Dato para prueba
  const { proveedor_id } = req.params;
  const {
    proveedor_nombre,
    proveedor_telefono,
    proveedor_email,
  } = req.body;

  const edit_prov = {
    proveedor_nombre,
    proveedor_telefono,
    proveedor_email,
  }
  let err;
  try {
    const reSql = await pool.query("UPDATE proveedor set ?  WHERE proveedor_id = ?", [edit_prov, proveedor_id]);
    res.json({
      data: reSql,
      msg: "Proveedor modificado exitosamente",
    })
  } catch (error) {
    console.log("Error identificado:", error);
    err = error;
    res.json({
      estado: false,
      msg: "¡ERROR!, Revisa que hayas ingresado correctamente los datos"
    });
  }
};
//------------------------------------------------------------------------------------------------------

//Función para eliminar atributos en la tabla proveedor---------------------------------------------------
proveedor.delete_prov = async (req, res) => {
  //const { proveedor_id = 3 } = req.params; //Dato para prueba
  const { proveedor_id } = req.params;
  await pool.query("DELETE FROM proveedor WHERE proveedor_id = ?", [proveedor_id]);
  res.json({
    msg: "Producto eliminado exitosamente",
    estado: true,
  });
};
//--------------------------------------------------------------------------------------------------------

//Función para consultar los datos de la tabla proveedor---------------------------------------------------
proveedor.view_prov = async (req, res) => {
  const resProv = await pool.query("SELECT * FROM proveedor");
  res.json({
    data: resProv
  });
  //console.log("hola soy el resProv", resProv)
};
//---------------------------------------------------------------------------------------------------------
module.exports = proveedor;