const { response } = require("express");
const pool = require("../src/db");
const sp = {};

sp.insert = async (req, res) => {
  const {
    sp_no_parte,
    sp_descripcion,
    sp_meses,
    sp_semanas,
    sp_id_precio,
    sp_id_proveedor,
    sp_id_categoria,
    sp_comentarios,
  } = req.body();

  const new_sp = {
    sp_no_parte,
    sp_descripcion,
    sp_meses,
    sp_semanas,
    sp_id_precio,
    sp_id_proveedor,
    sp_id_categoria,
    sp_comentarios,
  };

  const sql = await pool.query("INSERT INTO servicio_producto SET ?", [new_sp]);
  res.json({
    msg: "Producto editado exitosamente",
    estado: true,
  });
};

sp.update = async (req, res) => {
  const { id } = req.params;
  const {
    sp_no_parte,
    sp_descripcion,
    sp_meses,
    sp_semanas,
    sp_id_precio,
    sp_id_proveedor,
    sp_id_categoria,
    sp_comentarios,
  } = req.body();

  const edit_sp = {
    sp_no_parte,
    sp_descripcion,
    sp_meses,
    sp_semanas,
    sp_id_precio,
    sp_id_proveedor,
    sp_id_categoria,
    sp_comentarios,
  };
  await pool.query("UPDATE servicio_producto set ? WHERE sp_id", [edit_sp, id]);
  res.json({
    msg: "Producto editado exitosamente",
    estado: true,
  });
};

sp.delete = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE servicio_producto WHERE sp_id", [id]);
  res.json({
    msg: "Producto eliminado exitosamente",
    estado: true,
  });
};

sp.view = async (req, res) => {
  const reSql = await pool.query(
    "SELECT (sp_no_parte, sp_descripcion, sp_meses, sp_semanas," 
    +"precio_cantidad, precio_lista, precio_unitario, precio_descuento,"
    +"pt_total, moneda_nombre,"
    +"proveedor_nombre, proveedor_telefono, proveedor_compania, categoria_nombre)"
    +"FROM servicio_producto"
    +"join precio on sp_id_precio = precio_id"
    +"join precios_totales on precio_id_pt = pt_id"
    +"join moneda on pt_id_moneda = moneda_id"
    +"join proveedor on sp_id_proveedor = proveedor_id"
    +"join proveedor_marca on pm_id_marca = marca_id"
    +"join categoria on sp_id_categoria = categoria_id"
    );
    res.json({reSql:resSql});
};
