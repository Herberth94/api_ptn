const pool = require('../src/db');
const bcrypt = require("bcryptjs");

/*==================================================== CRUD - Tabla colaboradores ====================================================*/
/*========================== Create ==========================*/
exports.insertColaborador = async (req, res) => {
  /* ID DE USUARIO LOGEADO , INGRESA UN NUEVO DATO A LA TABLA USUARIO_COLABORADOR */
  const { colab_id_usuario, colab_id_proyecto, password, validatorid } = req.body;
  let validaIdUsuario = parseInt(validatorid);
  let passwordBody = password.password;
  const dataEnviar = {
    colab_id_usuario,
    colab_id_proyecto
  }
  const contrasenaHasheadaGuardada = await pool.query('SELECT password FROM usuarios WHERE id_usuario = ?', [validaIdUsuario]);
  const contrasenaHashDestructurada = contrasenaHasheadaGuardada[0].password
    // /* INSERCCION DE DATOS A TABLA COLABORADORES */
  bcrypt.compare(passwordBody, contrasenaHashDestructurada).then((resX) => {
    return resX
  }).then((data) => {
    if (data == true) {
      //console.log(dataEnviar)
      const reSql = pool.query("INSERT INTO colaboradores set ? ", dataEnviar);
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
/*============================================================*/

/*========================== Read ==========================*/
//Función que consulta los proyectos en los que esta participando un colaborador 
exports.viewProyColab = async(req, res) => {
  const { id_usuario } = req.params;
  const reSql = await pool.query(
    "SELECT proyecto_id, proyecto_clave, proyecto_descripcion, proyecto_id_cliente, proyecto_fecha_creacion,"
  + "proyecto_fecha_modificacion, proyecto_estatus, proyecto_valor_dolar, proyecto_plazo_meses, colab_id_usuario, email "
  + "FROM proyecto "
  + "INNER JOIN colaboradores ON proyecto_id = colab_id_proyecto "
  + "INNER JOIN usuarios ON colab_id_usuario = id_usuario "
  + "WHERE id_usuario = ?", [id_usuario]);
  res.json({ data: reSql })
  //console.log(reSql)
};

//Función que consulta los Colaboradores de un proyecto
exports.viewColab = async(req, res) => {
  const { proyecto_id } = req.params;
  const reSql = await pool.query(
  "SELECT colab_id,id_usuario, email "
  + "FROM proyecto "
  + "INNER JOIN colaboradores ON proyecto_id = colab_id_proyecto "
  + "INNER JOIN usuarios ON colab_id_usuario = id_usuario "
  + "WHERE proyecto_id = ?", [proyecto_id]);
  res.json({ data: reSql })
  //console.log(reSql)
};
/*==========================================================*/

/*========================== Update ==========================*/
exports.updateProyectos = async (req, res) => {
  const { id } = req.params;
  const updateProyectos = req.body;
  await pool.query("UPDATE proyecto set ? WHERE proyecto_id = ?", [updateProyectos, id]);

  res.json({
    msg: 'Proyectos  se estan modificando',
    estado: true
  })
};
/*============================================================*/

/*========================== Delete ==========================*/
exports.deleteProyectos = async (req, res) => {
  const {colab_id} = req.params;
  await pool.query("DELETE FROM colaboradores WHERE colab_id = ?", [colab_id]);
  res.json({msg: 'Colaborador eleminado',estado: true})
};
/*============================================================*/
/*====================================================================================================================================*/