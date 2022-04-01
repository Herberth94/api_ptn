const pool = require('../src/db');
const bcrypt = require("bcryptjs");

exports.insertProyectos = async (req, res) => {
  /* ID DE USUARIO LOGEADO QUE INGRESA UN NUEVO PROYECTO */
  const { id } = req.params
  console.log("este es el id", id)
  const insertProyectos = req.body;
  console.log(req.body)
  /* INSERCCION DE DATOS A TABLA PROYECTO */
  const proyecto = await pool.query("INSERT INTO proyecto set ?", insertProyectos);
  /* DATOS PARA INGRESAR EN LA TABLA USUARIOS_PROYECTOS  */
  const user_p = {
    up_id_usuario: id,
    up_id_proyecto: proyecto.insertId
  }
  //console.log(id);
  //console.log(user_p);
  /* INSERCCION DE DATOS A LA TABLA USUARIOS_PROYECTOS  */
  const usuario_p = await pool.query("INSERT INTO usuarios_proyectos set ?", user_p);
  res.json({
    msg: 'Proyecto agregado',
    estado: true,
    id_proyecto: proyecto.insertId
  });
};

exports.UpdateStatusProyectos = async (req, res) => {
  /* ID DE USUARIO LOGEADO QUE INGRESA UN NUEVO PROYECTO */
  const { proyecto_id } = req.params
  const { proyecto_estatus } = req.body;
  const Pestatus = {
    proyecto_estatus
  };
  //proyecto_estatus = 'En revision';
  /* INSERCCION DEL DATO proyecto_estatus A LATABLA PROYECTO */
  await pool.query("UPDATE proyecto set ? WHERE proyecto_id = ?", [Pestatus, proyecto_id]);
  /* DATOS PARA INGRESAR EN LA TABLA USUARIOS_PROYECTOS  */
  res.json({
    msg: 'Estatus del proyecto agregado',
    estado: true
  });
};

exports.UpdateDivisa = async (req, res) => {
  const { proyecto_id } = req.params
  const { proyecto_valor_dolar } = req.body;
  const editDiv = {
    proyecto_valor_dolar
  };
  await pool.query("UPDATE proyecto set ? WHERE proyecto_id = ?", [editDiv, proyecto_id]);
  res.json({
    msg: 'Divisa del proyecto editada',
    estado: true
  });
};

exports.updateProyectos = async (req, res) => {
  const { id } = req.params;
  const { proyecto_clave, proyecto_descripcion, proyecto_id_cliente} = req.body;
  const updateProyectos = {
    proyecto_clave,
    proyecto_descripcion,
    proyecto_id_cliente
  };
  await pool.query("UPDATE proyecto set ? WHERE proyecto_id = ?", [updateProyectos, id]);
  res.json({
    msg: 'Proyectos  se estan modificando',
    estado: true
  })
};

exports.deleteProyectos = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM proyecto WHERE proyecto_id = ?", [id]);
  res.json({
    msg: 'proyectos eleminados',
    estado: true
  })
}

// Función para consultar todos los atributos de la tabla proyecto
exports.viewProyecto = async (req, res) => {
  const reSql = await pool.query("SELECT * FROM proyecto");
  res.json({ data: reSql });
  console.log(reSql);
};

/*
  Función para consultar los atributos proyecto_id, proyecto_clave, proyecto_descripcion, nombre_cliente, proyecto_fecha_creacion
  para usuarios administrador  
*/
exports.viewAdmin = async (req, res) => {
  const reSql = await pool.query(
    "SELECT id_usuario, email, proyecto_id, proyecto_clave, proyecto_descripcion, proyecto_id_cliente," 
    +"nombre_cliente, proyecto_fecha_creacion, proyecto_fecha_modificacion, proyecto_estatus,proyecto_valor_dolar,proyecto_plazo_meses "
    + "FROM usuarios "
    + "LEFT JOIN usuarios_proyectos ON id_usuario = up_id_usuario "
    + "RIGHT JOIN proyecto ON up_id_proyecto = proyecto_id "
    + "LEFT JOIN clientes ON proyecto_id_cliente = cliente_id "
    + "ORDER BY proyecto_id"
  );
  res.json({ data: reSql });
  console.log(reSql);
};

/*
  Función para consultar los atributos proyecto_id, proyecto_clave, proyecto_descripcion, nombre_cliente, proyecto_fecha_creacion
  para usuarios de preventa
*/
exports.viewVentas = async (req, res) => {
  const { usuario_id } = req.params;
  const reSql = await pool.query(
    "SELECT proyecto_id, proyecto_clave, proyecto_descripcion, proyecto_id_cliente,"
    +"nombre_cliente, proyecto_fecha_creacion, proyecto_fecha_modificacion, proyecto_estatus, proyecto_valor_dolar, proyecto_plazo_meses "
    + "FROM usuarios "
    + "LEFT JOIN usuarios_proyectos ON id_usuario = up_id_usuario "
    + "RIGHT JOIN proyecto ON up_id_proyecto = proyecto_id "
    + "LEFT JOIN clientes ON proyecto_id_cliente = cliente_id "
    + "WHERE id_usuario = ? "
    + "ORDER BY proyecto_id", [usuario_id]);
  res.json({ data: reSql });
  console.log(reSql);
};
//ruta para asignar un proyecto a un usuario de ventas
exports.insertUsuariosProyectos = async(req, res) => {
  const { up_id_usuario, up_id_proyecto, password, validatorid } = req.body;
  let validaIdUsuario = parseInt(validatorid);
  let passwordBody = password.password;
  const dataEnviar = {
    up_id_usuario,
    up_id_proyecto
  }
  const contrasenaHasheadaGuardada = await pool.query('SELECT password FROM usuarios WHERE id_usuario = ?', [validaIdUsuario]);
  const contrasenaHashDestructurada = contrasenaHasheadaGuardada[0].password;
  // /* INSERCCION DE DATOS A TABLA COLABORADORES */
  bcrypt.compare(passwordBody, contrasenaHashDestructurada).then((resX) => {
    return resX
  }).then((data) => {
    if (data == true) {
      console.log(dataEnviar)
      const reSql = pool.query("INSERT INTO usuarios_proyectos set ? ", dataEnviar);
      res.json({
        msg: 'colaborador agregado',
        estado: true,
        data: reSql
      });
    } else {
      res.json({
        estado: false,
        msg: "Usuario no registrado"
      });

    }
  })
  
};

exports.viewModal = async (req, res) => {
  const { proyecto_id } = req.params;
  const reSql = await pool.query(
    "SELECT partida_nombre, partida_descripcion, sp_no_parte, sp_meses, sp_semanas, sp_cantidad, categoria_nombre, precio_total, moneda_nombre "
    +"FROM proyecto "
    +"RIGHT JOIN pp ON pp_id_proyecto = proyecto_id "
    +"RIGHT JOIN partida ON pp_id_partida = partida_id "
    +"RIGHT JOIN psp ON psp_id_partida = partida_id "
    +"RIGHT JOIN servicio_producto ON psp_id_sp = sp_id "
    +"RIGHT JOIN precio ON sp_id_precio = precio_id "
    +"RIGHT JOIN categoria ON sp_id_categoria = categoria_id "
    +"RIGHT JOIN moneda ON precio_id_moneda = moneda_id "
    +"WHERE proyecto_id = ? "
    +"ORDER BY partida_id", [proyecto_id]);
  res.json({ reSql: reSql });
  console.log({data:reSql});
};

