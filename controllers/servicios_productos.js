const pool = require("../src/db");
const sp = {};

// Función para agregar atributos en la tabla servicio_producto y psp
sp.insert_sp = async (req, res) => {
  const {id} = req.params;
  const new_sp= {
    sp_no_parte,
    sp_descripcion,
    sp_meses,
    sp_semanas,
    sp_cantidad, 
    sp_id_proveedor,
    sp_id_categoria,
    sp_comentarios,
  } = req.body;
  //console.log(req.body)
  //new_sp.sp_no_parte = 70; //Dato para prueba
  const reSql = await pool.query('insert into servicio_producto set ?', [new_sp]);

  const psp ={
    psp_id_partida:id,
    psp_id_sp:reSql.insertId
  }
  console.log()
  const reSql2 = await pool.query("INSERT INTO psp set ?", [psp]);
  /* DEVUELVE RESPUESTA AL FRONT LOS SIGUIENTES DATOS*/
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
    sp_cantidad,
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

/*== Función para consultar datos relacionados de una determinada partida ==*/
sp.viewPSP = async (req, res) => {
  const {partida_id} = req.params;
  const reSql = await pool.query(
    "SELECT sp_id, sp_no_parte, sp_descripcion, sp_meses, sp_semanas, sp_cantidad,"
    +"proveedor_nombre, marca_nombre, categoria_nombre, sp_comentarios "
    +"FROM partida "
    +"RIGHT JOIN psp ON psp_id_partida = partida_id "
    +"RIGHT JOIN servicio_producto ON psp_id_sp = sp_id "
    +"RIGHT JOIN proveedor ON sp_id_proveedor = proveedor_id "
    +"RIGHT JOIN proveedor_marca ON pm_id_proveedor = proveedor_id "
    +"RIGHT JOIN marca ON pm_id_marca = marca_id "
    +"RIGHT JOIN categoria ON sp_id_categoria = categoria_id "
    +"WHERE partida_id = ? "
    +"ORDER BY sp_id", [partida_id]);
  res.json({data:reSql});
  //console.log(reSql);
};


module.exports = sp;