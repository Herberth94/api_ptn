const pool = require("../src/db");
const sp = {};

// Función para agregar atributos en la tabla servicio_producto y psp
sp.insert_sp = async (req, res) => {
  const {partida_id, proveedor_id, marca_id} = req.params;
  const new_sp= {
    sp_no_parte,
    sp_descripcion,
    sp_meses,
    sp_semanas,
    sp_cantidad, 
    sp_id_categoria,
    sp_comentarios,
  } = req.body;
  console.log(req.body)

  try{
    if(sp_no_parte !=='' && sp_id_categoria !== ''){
      const reSql = await pool.query('insert into servicio_producto set ?', [new_sp]);
 
      const psp ={
        psp_id_partida:partida_id,
        psp_id_sp:reSql.insertId
      }
      console.log(psp)
      const reSql2 = await pool.query('INSERT INTO psp SET ?', [psp]);
    
      const sppm ={
        sppm_id_sp:reSql.insertId,
        sppm_id_proveedor: proveedor_id,
        sppm_id_marca: marca_id
      };
      if(proveedor_id !== '' && marca_id !== ''){
        await pool.query('INSERT INTO sp_proveedor_marca SET ?', [sppm]);
      }else{
        res.json({
          msg: "Por favor asegurate de agregar correctamente el proveedor y la marca",
          estado: true,
        });

      }
      
      /* DEVUELVE RESPUESTA AL FRONT LOS SIGUIENTES DATOS*/
      res.json({
        //data: reSql,
        msg: "Servico/producto registrado exitosamente",
        estado: true,
      });
      

    }else{
      res.json({
        estado: false,
        msg: "¡ERROR, no seleccionaste una categoría!, por favor selecciona una categoría"
      });
    }
 

  } catch (error){
    console.log("Error identificado:",error);
    err = error;

    res.json({
     msg:'Error al agregar el servicio producto',
     error:err
   });
  }

};

// Función para editar atributos en la tabla servicio_producto
sp.update_sp = async (req, res) => {
  const { sp_id, sppm_id_proveedor, sppm_id_marca } = req.params;
  const{
    sp_no_parte,
    sp_descripcion,
    sp_meses,
    sp_semanas,
    sp_cantidad,
    sp_id_categoria,
    sp_comentarios } = req.body;

  const editnew_sp = {
    sp_no_parte,
    sp_descripcion,
    sp_meses,
    sp_semanas,
    sp_cantidad,
    sp_id_categoria,
    sp_comentarios };
  //editnew_sp1.sp_no_parte = 20; //Dato para prueba
  await pool.query("UPDATE servicio_producto set ?  WHERE sp_id = ?", [editnew_sp,sp_id]);
  
  const editnewSPPM ={
    sppm_id_proveedor,
    sppm_id_marca
  }
  await pool.query("UPDATE sp_proveedor_marca set ?  WHERE sppm_id_sp = ?", [editnewSPPM,sp_id]);
  res.json({
    msg: "Producto editado exitosamente",
    estado: true,
  });
};

// Función para editar el atributo sp_cantidad en la tabla servicio_producto
sp.update_sp_cant = async (req, res) => {
  const { sp_id} = req.params;
  const{
    sp_cantidad} = req.body;

  const editnew_sp = {
    sp_cantidad
}
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
    "SELECT sp_id, sp_no_parte, sp_descripcion, sp_meses, sp_semanas, sp_cantidad, sp_id_precio,"
    +"proveedor_id, proveedor_nombre, marca_id, marca_nombre, sp_id_categoria, sp_comentarios "
    +"FROM partida "
    +"RIGHT JOIN psp ON psp_id_partida = partida_id "
    +"RIGHT JOIN servicio_producto ON psp_id_sp = sp_id "
    +"LEFT JOIN precio ON sp_id_precio = precio_id "
    +"LEFT JOIN sp_proveedor_marca ON sppm_id_sp = sp_id "
    +"RIGHT JOIN proveedor ON sppm_id_proveedor = proveedor_id "
    +"RIGHT JOIN marca ON sppm_id_marca = marca_id "
    +"RIGHT JOIN categoria ON sp_id_categoria = categoria_id "
    +"WHERE partida_id = ? "
    +"ORDER BY sp_id", [partida_id]);
  res.json({data:reSql});
  //console.log(reSql);
};


module.exports = sp;