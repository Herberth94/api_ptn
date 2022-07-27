const pool = require('../src/db');
const bcrypt = require("bcryptjs");

/*========================================= CRUD - Tabla proyecto =========================================*/
/*========================== Create ==========================*/
exports.insertProyectos = async (req, res) => {
  /* ID DE USUARIO LOGEADO QUE INGRESA UN NUEVO PROYECTO */
  const { id } = req.params

  const newProy = req.body;

  let err;
  try {
    if (newProy.proyecto_id_cliente !== '') {
      const proyecto = await pool.query("INSERT INTO proyecto set ?", newProy);

      const user_p = {
        up_id_usuario: id,
        up_id_proyecto: proyecto.insertId
      }
      
      await pool.query("INSERT INTO usuarios_proyectos set ?", user_p);
      res.json({
        msg: 'Proyecto agregado exitosamente',
        estado: true,
        id_proyecto: proyecto.insertId,
        error: err
      });
    } else {
      res.json({
        estado: false,
        msg: "¡ERROR!, Revisa que hayas seleccionado correctamente el cliente"
      });
    }
  } catch (error) {
    console.log("Error identificado:", error);
    err = error;

    res.json({
      msg: 'Error al insertar un proyecto',
      msg2: 'Necesita seleccionar un cliente',
      estado:false
    });
  }
};

//Función para asignar un proyecto a un usuario de ventas
exports.insertUsuariosProyectos = async (req, res) => {
  let err;
  try {
    const { up_id_usuario, up_id_proyecto, password, validatorid } = req.body;
    let validaIdUsuario = parseInt(validatorid);
    let passwordBody = password.password;
    const dataEnviar = {
      up_id_usuario,
      up_id_proyecto
    }
    const contrasenaHasheadaGuardada = await pool.query('SELECT password FROM usuarios WHERE id_usuario = ?', [validaIdUsuario]);
    const contrasenaHashDestructurada = contrasenaHasheadaGuardada[0].password;
    bcrypt.compare(passwordBody, contrasenaHashDestructurada).then((resX) => {
      return resX
    }).then((data) => {
      if (data == true) {
        console.log(dataEnviar)
        const reSql = pool.query("INSERT INTO usuarios_proyectos set ? ", dataEnviar);
        res.json({
          msg: 'Asignación de proyecto a usuario realizada exitosamente',
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
  } catch (error) {
    console.log("Error identificado:", error);
    err = error;
    res.json({
      msg: 'Error al insertar el proyecto a un usuario',
      error: err
    });
  }
};
/*============================================================*/

/*========================== Read ==========================*/
// Función para consultar todos los atributos de la tabla proyecto
exports.viewProyecto = async (req, res) => {
  const reSql = await pool.query("SELECT * FROM proyecto");
  res.json({ data: reSql });
  //console.log(reSql);
};

//Función para consultar los proyectos de los usuarios administrador  
exports.viewAdmin = async (req, res) => {
  const reSql = await pool.query(
      "SELECT proyecto_id, proyecto_clave, proyecto_descripcion, proyecto_id_cliente,"
    + "nombre_cliente, proyecto_fecha_creacion, proyecto_fecha_modificacion, proyecto_estatus,"
    + "proyecto_valor_dolar,proyecto_plazo_meses,proyecto_id_moneda "
    + "FROM proyecto "
    + "INNER JOIN clientes ON proyecto_id_cliente = cliente_id "
    + "INNER JOIN moneda ON moneda_id = proyecto_id_moneda "
    + "ORDER BY proyecto_id"
  );
  res.json({ data: reSql });
  //console.log(reSql);
};


//Función para consultar los proyectos de una determinado usuario
exports.viewVentas = async (req, res) => {
  const { usuario_id } = req.params;
  const reSql = await pool.query(
      "SELECT proyecto_id, proyecto_clave, proyecto_descripcion, proyecto_id_cliente,"
    + "nombre_cliente, proyecto_fecha_creacion, proyecto_fecha_modificacion, proyecto_estatus,"
    + "proyecto_valor_dolar,proyecto_plazo_meses,proyecto_id_moneda "
    + "FROM usuarios "
    + "INNER JOIN usuarios_proyectos ON id_usuario = up_id_usuario "
    + "INNER JOIN proyecto ON up_id_proyecto = proyecto_id "
    + "INNER JOIN clientes ON proyecto_id_cliente = cliente_id "
    + "INNER JOIN moneda ON moneda_id = proyecto_id_moneda "
    + "WHERE id_usuario = ? "
    + "ORDER BY proyecto_id", [usuario_id]);
  res.json({ data: reSql });
  //console.log(reSql);
};

//Función que consulta datos de un proyecto para el modal
exports.viewModal = async (req, res) => {
  const { proyecto_id } = req.params;
  const reSql = await pool.query(
    "SELECT sp_id,partida_nombre, partida_descripcion,spnp_np,spd_des,sp_meses,sp_semanas,sp_cantidad,categoria_nombre,precio_total,moneda_nombre "
    + "FROM proyecto "
    + "INNER JOIN pp ON pp_id_proyecto = proyecto_id "
    + "INNER JOIN partida ON pp_id_partida = partida_id "
    + "INNER JOIN psp ON psp_id_partida = partida_id "
    + "INNER JOIN servicio_producto ON psp_id_sp = sp_id "
    + "INNER JOIN sp_no_parte ON spnp_id = sp_id_spnp "
    + "INNER JOIN sp_descripcion ON spd_id = sp_id_spd "
    + "INNER JOIN precio ON sp_id_precio = precio_id "
    + "INNER JOIN categoria ON sp_id_categoria = categoria_id "
    + "INNER JOIN moneda ON precio_id_moneda = moneda_id "
    + "WHERE proyecto_id = ? "
    + "ORDER BY partida_id", [proyecto_id]);
  res.json({ reSql: reSql });
  //console.log({data:reSql});
};

//Función que consulta datos de un proyecto para el modal
exports.viewPlantilla = async (req, res) => {
  const { proyecto_id } = req.params;
  const reSql = await pool.query(
    "SELECT * "
    + "FROM proyecto "
    + "INNER JOIN pp ON pp_id_proyecto = proyecto_id "
    + "INNER JOIN partida ON pp_id_partida = partida_id "
    + "INNER JOIN psp ON psp_id_partida = partida_id "
    + "INNER JOIN servicio_producto ON psp_id_sp = sp_id "
    + "INNER JOIN sp_proveedor_marca ON sp_id = sppm_id_sp "
    + "INNER JOIN proveedor ON proveedor_id = sppm_id_proveedor "
    + "INNER JOIN marca ON marca_id = sppm_id_marca "
    + "INNER JOIN sp_no_parte ON spnp_id = sp_id_spnp "
    + "INNER JOIN sp_descripcion ON spd_id = sp_id_spd "
    + "INNER JOIN precio ON sp_id_precio = precio_id "
    + "INNER JOIN categoria ON sp_id_categoria = categoria_id "
    + "INNER JOIN moneda ON precio_id_moneda = moneda_id "
    + "WHERE proyecto_id = ? "
    + "ORDER BY partida_id", [proyecto_id]);
  res.json({ reSql: reSql });
  //console.log({data:reSql});
};
/*==========================================================*/

/*========================== Update ==========================*/
//Función que modifica el estatus de un proyecto
exports.UpdateStatusProyectos = async (req, res) => {
  /* ID DE USUARIO LOGEADO QUE INGRESA UN NUEVO PROYECTO */
  const { proyecto_id } = req.params
  const { proyecto_estatus } = req.body;
  const Pestatus = {
    proyecto_estatus
  };
  //proyecto_estatus = 'En revision';
  /* INSERCCION DEL DATO proyecto_estatus A LATABLA PROYECTO */
  try {
    await pool.query("UPDATE proyecto set ? WHERE proyecto_id = ?", [Pestatus, proyecto_id]);
    /* DATOS PARA INGRESAR EN LA TABLA USUARIOS_PROYECTOS  */
    res.json({
      msg: 'Estatus del proyecto agregado',
      estado: true
    });
  } catch (error) {
    console.log("Error identificado:", error);
    err = error;

    res.json({
      msg: 'Error al actualizar el estatus de un proyecto, revisa que hayas ingresado correctamente los datos',
    });
  }
};

//Función que modifica la fecha de modificación de un proyecto
exports.UpdateFechaMod = async (req, res) => {
  const { proyecto_id } = req.params

  const { proyecto_fecha_modificacion } = req.body;

  const editFM = {
    proyecto_fecha_modificacion
  };

  try {
    await pool.query("UPDATE proyecto set ? WHERE proyecto_id = ?", [editFM, proyecto_id]);
    res.json({
      msg: 'Se actualizo la Fecha de modificación correctamente',
      estado: true
    });
  } catch (error) {
    console.log("Error identificado:", error);
    err = error;
    res.json({
      estado: false,
      msg: "¡ERROR! al actualizar la Fecha de modificación"
    });
  }
};

//Función que modifica la divisa y moenda de un proyecto
exports.UpdateDivisa = async (req, res) => {
  const { proyecto_id } = req.params
  const { proyecto_valor_dolar, proyecto_id_moneda } = req.body;
  const editDiv = {
    proyecto_valor_dolar,
    proyecto_id_moneda
  };
  try {
    const reSql = await pool.query("UPDATE proyecto set ? WHERE proyecto_id = ?", [editDiv, proyecto_id]);
    res.json({
      data: reSql,
      msg: 'Divisa del proyecto modificada exitosamente',
      estado: true
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

//Función que modifica datos de un proyecto
exports.updateProyectos = async (req, res) => {
  const { id } = req.params;

  const updateProyectos = req.body;
  
  try {
    await pool.query("UPDATE proyecto set ? WHERE proyecto_id = ?", [updateProyectos, id]);
    res.json({
      msg: 'Proyecto modificando exitosamente',
      estado: true
    })
  } catch (error) {
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
exports.deleteProyectos = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM proyecto WHERE proyecto_id = ?", [id]);
  res.json({
    msg: 'proyectos eleminados',
    estado: true
  })
}
/*============================================================*/
/*=========================================================================================================*/
