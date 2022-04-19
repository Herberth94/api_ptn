const pool = require("../src/db");
const sp = {};

/*================== CRUD - Tabla servicio_producto, sp_proveedor_marca, sp_no_parte y sp_descripcion ==================*/
/*========================== Create ==========================*/
// Función para agregar atributos en la tabla servicio_producto y psp
sp.insert_sp = async (req, res) => {
  const {partida_id, proveedor_id, marca_id} = req.params;
  const new_sp= {
    sp_id_spnp,
    sp_id_spd,
    sp_meses,
    sp_semanas,
    sp_cantidad, 
    sp_id_categoria,
    sp_comentarios,
  } = req.body;
  console.log(req.body)

  try{
    if(sp_id_spnp !=='' && sp_id_categoria !== ''){
      const reSql = await pool.query('INSERT into servicio_producto set ?', [new_sp]);
 
      const psp ={
        psp_id_partida:partida_id,
        psp_id_sp:reSql.insertId
      }
      //console.log(psp)
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

sp.insert_spnp = async (req, res) => {
  const new_spnp= {
    spnp_np
  } = req.body;
  try {
    if(new_spnp.spnp_np !== ''){
      const sp = await pool.query("INSERT into sp_no_parte set ?",[new_spnp]);
      res.json({
        msg:'No. de Parte de un Servicio/Producto agregado correctamnete',
        data:sp
      }); 
    }
  } catch (error) {
    res.json({
      msg:'Error al agregar el No. de Parte',
      error:error
    });
  }   
};

sp.insert_spd = async (req, res) => {
  const new_spd= {
    spd_des
  } = req.body;
  try {
    if(new_spd.spd_des !== ''){
      const sp = await pool.query("INSERT into sp_descripcion set ?",[new_spd]);
      res.json({
        msg:'Descripción de un Servicio/Producto agregada correctamnete',
        data:sp
      }); 
    }
  } catch (error) {
    res.json({
      msg:'Error al agregar la Descripción del Servicio/Producto',
      error:error
    });
  }   
};
/*============================================================*/

/*========================== Read ==========================*/
//Función para consultar datos relacionados de una determinada partida 
sp.viewPSP = async (req, res) => {
  const {partida_id} = req.params;
  const reSql = await pool.query(
      "SELECT sp_id,sp_id_spnp,spnp_np,sp_id_spd,spd_des,sp_meses,sp_semanas,sp_cantidad,sp_id_precio,"
    + "proveedor_id, proveedor_nombre, marca_id, marca_nombre, sp_id_categoria, sp_comentarios "
    + "FROM partida "
    + "INNER JOIN psp ON psp_id_partida = partida_id "
    + "INNER JOIN servicio_producto ON psp_id_sp = sp_id "
    + "INNER JOIN sp_no_parte ON spnp_id = sp_id_spnp "
    + "INNER JOIN sp_descripcion ON spd_id = sp_id_spd "
    + "INNER JOIN precio ON sp_id_precio = precio_id "
    + "INNER JOIN sp_proveedor_marca ON sppm_id_sp = sp_id "
    + "INNER JOIN proveedor ON sppm_id_proveedor = proveedor_id "
    + "INNER JOIN marca ON sppm_id_marca = marca_id "
    + "INNER JOIN categoria ON sp_id_categoria = categoria_id "
    + "WHERE partida_id = ? "
    + "ORDER BY sp_id", [partida_id]);
  res.json({data:reSql});
  //console.log(reSql);
};

// Función para consultar datos relacionados de una determinada partida 
sp.viewFindSP = async (req, res) => {
  const reSql = await pool.query(
      "SELECT proyecto_clave, partida_nombre,spnp_id,spnp_np,spd_id,spd_des,sp_meses,sp_semanas,sp_cantidad,sp_id_precio,"
    + "precio_lista,precio_unitario,precio_descuento,precio_total,precio_id_moneda,"
    + "proveedor_nombre, marca_nombre, sp_id_categoria, sp_comentarios "
    + "FROM proyecto "
    + "INNER JOIN pp ON pp_id_proyecto = proyecto_id "
    + "INNER JOIN partida ON pp_id_partida = partida_id "
    + "INNER JOIN psp ON psp_id_partida = partida_id "
    + "INNER JOIN servicio_producto ON psp_id_sp = sp_id "
    + "INNER JOIN sp_no_parte ON spnp_id = sp_id_spnp "
    + "INNER JOIN sp_descripcion ON spd_id = sp_id_spd "
    + "INNER JOIN precio ON sp_id_precio = precio_id "
    + "INNER JOIN sp_proveedor_marca ON sppm_id_sp = sp_id "
    + "INNER JOIN proveedor ON sppm_id_proveedor = proveedor_id "
    + "INNER JOIN marca ON sppm_id_marca = marca_id "
    + "INNER JOIN categoria ON sp_id_categoria = categoria_id "
    );
  res.json({data:reSql});
  //console.log(reSql);
};

// Función para consultar datos de la tabla sp_no_parte
sp.viewSpnp = async (req, res) => {
  const reSql = await pool.query(
      "SELECT spnp_id,spnp_np FROM sp_no_parte"
    );
  res.json({data:reSql});
  //console.log(reSql);
};

// Función para consultar datos de la tabla sp_descripcion
sp.viewSpd = async (req, res) => {
  const reSql = await pool.query(
      "SELECT spd_id,spd_des FROM sp_descripcion"
    );
  res.json({data:reSql});
  //console.log(reSql);
};
/*==========================================================*/

/*========================== Update ==========================*/
// Función para editar atributos en la tabla servicio_producto
sp.update_sp = async (req, res) => {
  const { sp_id, sppm_id_proveedor, sppm_id_marca } = req.params;
  const{
    sp_id_spnp,
    sp_id_spd,
    sp_meses,
    sp_semanas,
    sp_cantidad,
    sp_id_categoria,
    sp_comentarios } = req.body;

  const editnew_sp = {
    sp_id_spnp,
    sp_id_spd,
    sp_meses,
    sp_semanas,
    sp_cantidad,
    sp_id_categoria,
    sp_comentarios };

    try{
      await pool.query("UPDATE servicio_producto set ?  WHERE sp_id = ?", [editnew_sp,sp_id]);
  
      const editnewSPPM ={
        sppm_id_proveedor,
        sppm_id_marca
      }
      await pool.query("UPDATE sp_proveedor_marca set ?  WHERE sppm_id_sp = ?", [editnewSPPM,sp_id]);

      res.json({
        msg: "Servicio/Producto editado exitosamente",
        estado: true,
      });
    } catch (error) {
      console.log("Error identificado:", error);
      err = error;
      res.json({
        estado: false,
        msg: "¡ERROR!, Revisa que hayas ingresado correctamente los datos"
      });
    }

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
  try{
    await pool.query("UPDATE servicio_producto set ?  WHERE sp_id = ?", [editnew_sp,sp_id]);
    res.json({
      msg: "Producto editado exitosamente",
      estado: true,
    });
  }catch (error) {
    console.log("Error identificado:", error);
    err = error;
    res.json({
      estado: false,
      msg: "¡ERROR!, Revisa que hayas ingresado correctamente los datos"
    });
  }

};
/*============================================================*/

/*========================== Delete ==========================*/
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
/*============================================================*/

module.exports = sp;