const pool = require("../src/db");
const sp = {};

// Función para agregar atributos en la tabla servicio_producto
sp.insert_sp = async (req, res) => {
  const { new_sp_id_precio, new_sp_id_proveedor, new_sp_id_categoria } = req.params;
  const new_sp= {
    sp_no_parte,
    sp_descripcion,
    sp_meses,
    sp_semanas,
    sp_id_precio: new_sp_id_precio,
    sp_id_proveedor: new_sp_id_proveedor,
    sp_id_categoria: new_sp_id_categoria,
    sp_comentarios,
  } = req.body;
  //new_sp.sp_no_parte = 50; //Dato para prueba
  await pool.query('insert into servicio_producto set ?', [new_sp]);
  res.json({
    msg: "Producto agregado exitosamente",
    estado: true,
  });
};

// Función para editar atributos en la tabla servicio_producto
sp.update_sp = async (req, res) => {
  //const { sp_id = 1003 } = req.params; //Dato para prueba
  const { 
    sp_id, 
    new_sp_id_precio, 
    new_sp_id_proveedor, 
    new_sp_id_categoria } = req.params;
  const editnew_sp = {
    sp_no_parte,
    sp_descripcion,
    sp_meses,
    sp_semanas,
    sp_id_precio: new_sp_id_precio,
    sp_id_proveedor: new_sp_id_proveedor,
    sp_id_categoria: new_sp_id_categoria,
    sp_comentarios } = req.body;
  //editnew_sp1.sp_no_parte = 20; //Dato para prueba
  await pool.query("UPDATE servicio_producto set ?  WHERE sp_id = ?", [editnew_sp,sp_id]);
  res.json({
    msg: "Producto editado exitosamente",
    estado: true,
  });
};

// Función para elimiar  atributos de la tabla servicio_producto
sp.delete_sp = async (req, res) => {
  //const { sp_id = 1003 } = req.params; //Dato para prueba
  const { sp_id } = req.params;
  await pool.query("DELETE FROM servicio_producto WHERE sp_id = ?", [sp_id]);
  res.json({
    msg: "Producto eliminado exitosamente",
    estado: true,
  });
};

// Función para consultar todos los atributos de la tabla servicio_producto, así como los atributos de la tablas con las que tiene una llave foránea 
sp.view_sp = async (req, res) => {
  const reSql = await pool.query(
    "SELECT sp_no_parte, sp_descripcion, sp_meses, sp_semanas, sp_cantidad," 
    +"precio_lista, precio_unitario, precio_descuento, moneda_nombre,"
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
    console.log(reSql);
};

module.exports = sp;