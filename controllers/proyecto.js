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
    const {proyecto_clave, proyecto_descripcion, proyecto_id_cliente} = req.body;
    const updateProyectos = {
      proyecto_clave,
      proyecto_descripcion,
      proyecto_id_cliente
    };
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
      "SELECT proyecto_id, proyecto_clave, proyecto_descripcion, proyecto_id_cliente, nombre_cliente, proyecto_fecha_creacion, proyecto_fecha_modificacion, proyecto_estatus "
      +"FROM proyecto "
      +"LEFTH JOIN clientes ON proyecto_id_cliente = cliente_id "
      +"ORDER BY proyecto_id"
      );
    res.json({data:reSql});
    console.log(reSql);
  };

