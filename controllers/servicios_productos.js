const { response } = require("express");
const pool = require("../src/db");
const sp = {};

// Función para agregar atributos que no tienen llave foránea (fk) en la tabla servicio_producto
sp.insert_sp1 = async (req, res) => {
  const new_sp1 = {
    sp_no_parte,
    sp_descripcion,
    sp_meses,
    sp_semanas,
    sp_comentarios,
  } = req.body;
  await pool.query("INSERT INTO servicio_producto sp_no_parte, sp_descripcion, sp_meses, sp_semanas, sp_comentarios"
  + 'SET ?', 
  //[new_sp1.sp_no_parte, new_sp1.sp_descripcion, new_sp1.sp_meses, new_sp1.sp_semanas, new_sp1.sp_comentarios]);
  [new_sp1]);
  res.json({
    msg: "Producto agregado exitosamente",
    estado: true,
  });
};

// Función para agregar atributos que tienen llave foránea (fk) en la tabla servicio_producto
sp.insert_sp2 = async (req, res) => {
  const new_sp2 = {
    sp_id_precio,
    sp_id_proveedor,
    sp_id_categoria,
  } = req.body;
  await pool.query("INSERT INTO servicio_producto sp_id_precio, sp_id_proveedor, sp_id_categoria SET ?", 
  //[new_sp2.sp_id_precio,new_sp2.sp_id_proveedor,new_sp2.sp_id_categoria]);
  [new_sp2]);
  res.json({
    msg: "Producto agregado exitosamente",
    estado: true,
  });
};

// Función para editar atributos que no tienen llave foránea (fk) en la tabla servicio_producto
sp.update_sp1 = async (req, res) => {
  const { sp_id } = req.params;
  const editnew_sp1 = {
    sp_no_parte,
    sp_descripcion,
    sp_meses,
    sp_semanas,
    sp_comentarios,
  } = req.body();

  await pool.query("UPDATE servicio_producto set sp_no_parte = ?, sp_descripcion = ?, sp_meses = ?, "
  + "sp_semanas = ?, sp_comentarios = ? WHERE sp_id = ?", 
  [editnew_sp1.sp_no_parte, editnew_sp1.sp_descripcion, editnew_sp1.sp_meses, editnew_sp1.sp_semanas, editnew_sp1.sp_comentarios,sp_id]);
  res.json({
    msg: "Producto editado exitosamente",
    estado: true,
  });
};

// Función para editar atributos que tienen llave foránea (fk) en la tabla servicio_producto
sp.update_sp2 = async (req, res) => {
  const { sp_id } = req.params;
  const editnew_sp2 = {
    sp_id_precio,
    sp_id_proveedor,
    sp_id_categoria,
  } = req.body();

  await pool.query("UPDATE servicio_producto set sp_id_precio = ?, sp_id_proveedor = ?, sp_id_categoria = ? "
  + "WHERE sp_id = ?", [editnew_sp2.sp_id_precio,editnew_sp2.sp_id_proveedor, editnew_sp2.sp_id_categoria, sp_id]);
  res.json({
    msg: "Producto editado exitosamente",
    estado: true,
  });
};

// Función para elimiar todos los atributos de la tabla servicio_producto
sp.delete_sp = async (req, res) => {
  const { sp_id } = req.params;
  await pool.query("DELETE servicio_producto WHERE sp_id", [sp_id]);
  res.json({
    msg: "Producto eliminado exitosamente",
    estado: true,
  });
};

// Función para consultar todos los atributos de la tabla servicio_producto, así como los atributos de la tablas con las que tiene una llave foránea 
sp.view_sp = async (req, res) => {
  const reSql = await pool.query(
    "SELECT sp_no_parte, sp_descripcion, sp_meses, sp_semanas," 
    +"precio_cantidad, precio_lista, precio_unitario, precio_descuento,"
    +"moneda_nombre,"
    +"proveedor_nombre, proveedor_telefono, proveedor_compania, categoria_nombre "
    +"FROM servicio_producto "
    +"INNER JOIN precio on sp_id_precio = precio_id "
    +"INNER JOIN moneda on precio_id_moneda = moneda_id "
    +"INNER JOIN proveedor on sp_id_proveedor = proveedor_id "
    +"INNER JOIN proveedor_marca on pm_id_proveedor = proveedor_id "
    +"INNER JOIN marca on pm_id_marca = marca_id "
    +"INNER JOIN categoria on sp_id_categoria = categoria_id "
    );
    res.json({reSql:reSql});
};

module.exports = sp;