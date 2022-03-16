const pool = require('../src/db');

exports.insertProyectos = async(req,res)=>{
     /* ID DE USUARIO LOGEADO QUE INGRESA UN NUEVO PROYECTO */   
    const  {id} = req.params
    console.log("este es el id", id)
    const insertProyectos = req.body;
    console.log(req.body)
    /* INSERCCION DE DATOS A TABLA PROYECTO */
    const proyecto = await pool.query("INSERT INTO proyecto set ?",insertProyectos);
    /* DATOS PARA INGRESAR EN LA TABLA USUARIOS_PROYECTOS  */
    const user_p ={
        up_id_usuario:id,
        up_id_proyecto:proyecto.insertId
    }
     //console.log(id);
     //console.log(user_p);
    /* INSERCCION DE DATOS A LA TABLA USUARIOS_PROYECTOS  */
    const usuario_p= await pool.query("INSERT INTO usuarios_proyectos set ?",user_p);
    res.json({
       msg: 'Proyecto agregado',
       estado: true,
       id_proyecto:proyecto.insertId
  });
};

exports.updateProyectos = async(req,res)=>{
    const {id}= req.params ;     
    const updateProyectos =req.body;
         await pool.query("UPDATE proyecto set ? WHERE proyecto_id = ?",[updateProyectos,id]);

         res.json({
                 msg: 'Proyectos  se estan modificando',
                 estado: true
         })
  };

  exports.deleteProyectos= async(req,res)=>{
    const {id} = req.params;
  await pool.query("DELETE FROM proyecto WHERE proyecto_id = ?",[id]);
  res.json({
          msg: 'proyectos eleminados',
          estado :true
  })  
  }

  // Función para consultar todos los atributos de la tabla proyecto
  exports.viewProyecto = async (req, res) => {
    const reSql = await pool.query("SELECT * FROM proyecto");
    res.json({data:reSql});
    console.log(reSql);
  };

  // Función para consultar los atributos proyecto_id, proyecto_clave, proyecto_descripcion, nombre_cliente, proyecto_fecha_creacion
  exports.viewProyectoWithNcliente = async (req, res) => {
    const reSql = await pool.query(
      "SELECT proyecto_id, proyecto_clave, proyecto_descripcion, nombre_cliente, proyecto_fecha_creacion, proyecto_estatus "
      +"FROM proyecto "
      +"LEFTH JOIN clientes ON proyecto_id_cliente = cliente_id "
      +"ORDER BY proyecto_id"
      );
    res.json({data:reSql});
    console.log(reSql);
  };

  // Función para consultar los atributos de un determinado proyecto
  exports.viewSerchProyecto = async (req, res) => {
    const {proyecto_id} = req.params;
    const reSql = await pool.query(
      "SELECT partida_nombre, partida_descripcion,"
      +"sp_no_parte, sp_descripcion, sp_meses, sp_semanas, sp_cantidad,"
      +"precio_lista, precio_unitario, precio_descuento, precio_total, moneda_nombre,"
      +"proveedor_nombre, marca_nombre, categoria_nombre, sp_comentarios "
      +"FROM proyecto "
      +"LEFT JOIN pp ON pp_id_proyecto = proyecto_id "
      +"LEFT JOIN partida ON pp_id_partida = partida_id "
      +"LEFT JOIN psp ON psp_id_partida = partida_id "
      +"LEFT JOIN servicio_producto ON psp_id_sp = sp_id "
      +"LEFT JOIN precio ON sp_id_precio = precio_id "
      +"LEFT JOIN moneda ON precio_id_moneda = moneda_id "
      +"LEFT JOIN proveedor ON sp_id_proveedor = proveedor_id "
      +"LEFT JOIN proveedor_marca ON pm_id_proveedor = proveedor_id "
      +"LEFT JOIN marca ON pm_id_marca = marca_id "
      +"LEFT JOIN categoria ON sp_id_categoria = categoria_id "
      +"WHERE proyecto_id = ?", [proyecto_id]);
    res.json({data:reSql});
    console.log(reSql);
  };
