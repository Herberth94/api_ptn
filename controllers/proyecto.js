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

  // Función para consultar todos los atributos de la tabla servicio_producto, así como los atributos de la tablas con las que tiene una llave foránea 
  exports.view_proyecto = async (req, res) => {
  const reSql = await pool.query(
    "SELECT * FROM proyecto"
    // "SELECT proyecto_clave, proyecto_descripcion, nombre_cliente, proyecto_fecha_creacion, proyecto_fecha_modificacion,"//Atributos de las tablas proyecto y cliente
    // +"cat_nombre, ct_totales, moneda_nombre," //Atributos de las tablas cat_c_a_spt_ma y moneda
    // +"partida_nombre, partida_descripcion,"// Atributos de la tabla partida
    // +"sp_no_parte, sp_descripcion, sp_meses, sp_semanas, sp_cantidad, sp_comentarios," // Atributos de la tabla servicio_producto
    // +"precio_lista, precio_unitario, precio_descuento, moneda_nombre," // Atributos de las tablas precio y moneda
    // +"proveedor_nombre, proveedor_telefono, proveedor_compania, categoria_nombre " //Atributos de las tablas proveedor y categoria
    // // Comienzo del recorrido entre las tablas
    // +"FROM proyecto " 
    // +"INNER JOIN clientes on proyecto_id_cliente = cliente_id "
    // +"INNER JOIN proyectos_cat on pc_id_proyecto = proyecto_id "
    // +"INNER JOIN categorias_c_a_sptn_ma on pc_id_cat = cat_id "
    // +"INNER JOIN cat_cat_t on cc_id_cat = cat_id "
    // +"INNER JOIN cat_totales on cc_id_cat_t = ct_id "
    // +"INNER JOIN pp on pp_id_proyecto = proyecto_id "
    // +"INNER JOIN partida on pp_id_partida = partida_id "
    // +"INNER JOIN psp on psp_id_partida = partida_id "
    // +"INNER JOIN servicio_producto on psp_id_sp = sp_id "
    // +"INNER JOIN precio on sp_id_precio = precio_id "
    // +"INNER JOIN moneda on precio_id_moneda = moneda_id and ct_id_moneda = moneda_id "
    // +"INNER JOIN proveedor on sp_id_proveedor = proveedor_id "
    // +"INNER JOIN proveedor_marca on pm_id_proveedor = proveedor_id "
    // +"INNER JOIN marca on pm_id_marca = marca_id "
    // +"INNER JOIN categoria on sp_id_categoria = categoria_id "
    );
    res.json({reSql:reSql});
    console.log(reSql.reSql);
  };
