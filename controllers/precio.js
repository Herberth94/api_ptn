const { response } = require("express");
const pool = require("../src/db");
const precio = {};

/*==================================================== CRUD - Tabla precio ====================================================*/
/*========================== Create ==========================*/
precio.insertPrecio = async (req, res) => {
  let err;
  const newPrecio = {precio_lista,precio_unitario,precio_descuento, precio_total,precio_id_moneda} = req.body;
  try{
    if(precio_id_moneda!==''){
      const precio_id = await pool.query('INSERT INTO precio SET ?', [newPrecio]);

      res.json({data: precio_id,msg: "Precio agregado exitosamente",estado: true,});

    }else {
      res.json({
        estado: false,
        msg: "¡ERROR!, Revisa que hayas ingresado correctamente el tipo de moneda",
      });
    }    

  } catch (error){
    console.log("Error identificado:",error);
    err = error;

    res.json({
      msg: "¡ERROR!, Revisa que hayas ingresado correctamente el tipo de moneda",
      error:err
   });
  }


};
/*============================================================*/

/*========================== Read ==========================*/
//Función para consultar los precios de un determinado servicio_producto
precio.viewSPP = async (req, res) => {
  const {sp_id} = req.params;

  const reSql = await pool.query(
     "SELECT sp_id, sp_cantidad, precio_id, precio_lista, precio_unitario, precio_descuento, precio_total,"
    +"precio_id_moneda, moneda_nombre "
    +"FROM servicio_producto "
    +"RIGHT JOIN precio ON sp_id_precio = precio_id "
    +"LEFT JOIN moneda ON precio_id_moneda = moneda_id "
    +"WHERE sp_id = ? "
    +"ORDER BY precio_id", [sp_id]);

  res.json({data:reSql});
};

//Función para consultar los precios de un determinado dato de una categoria
precio.viewCatsDP = async (req, res) => {
  const {cd_id} = req.params;

  const reSql = await pool.query(
     "SELECT cd_id, cd_cantidad, precio_id, precio_lista, precio_unitario, precio_descuento, precio_total,"
    +"precio_id_moneda, moneda_nombre "
    +"FROM categorias_datos "
    +"RIGHT JOIN precio ON cd_id_precio = precio_id "
    +"LEFT JOIN moneda ON precio_id_moneda = moneda_id "
    +"WHERE cd_id = ? "
    +"ORDER BY precio_id", [cd_id]);

  res.json({data:reSql});
};
/*==========================================================*/

/*========================== Update ==========================*/
precio.updatePrecio = async (req, res) => {

  const {precio_id} = req.params;

  const{precio_lista,precio_unitario,precio_descuento, precio_total,precio_id_moneda} = req.body;

  const editPrecio = {precio_lista,precio_unitario,precio_descuento, precio_total,precio_id_moneda};

  await pool.query("UPDATE precio set ?  WHERE precio_id = ?", [editPrecio, precio_id]);
  res.json({msg: "Precio agregado exitosamente",estado: true,});
};
/*============================================================*/

/*========================== Delete ==========================*/
precio.deletePrecio = async (req, res) => {
  const {precio_id} = req.params; 

  await pool.query("DELETE FROM precio WHERE precio_id = ?", [precio_id]);

  res.json({msg: "Precio eliminado exitosamente",estado: true,});
};
/*============================================================*/
module.exports = precio;
/*=============================================================================================================================*/
