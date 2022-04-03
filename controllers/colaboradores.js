const pool = require('../src/db');
const bcrypt = require("bcryptjs");

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
      console.log(dataEnviar)
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
// ver la lista de los colaboradores con el nombre de los proyectos donde son colaboradores
exports.viewColaboradores = async (req, res) => {
  const { id_usuario } = req.params;
  const reSql = await pool.query("SELECT id_usuario, email, colab_id, colab_id_proyecto, colab_id_usuario, email, proyecto_clave "
    + "FROM usuarios "
    + "LEFT JOIN usuarios_proyectos ON up_id_usuario = id_usuario "
    + "RIGHT JOIN colaboradores ON id_usuario = colab_id_usuario "
    + "RIGHT JOIN proyecto ON  proyecto_id = up_id_proyecto AND colab_id_proyecto "
    //+"RIGHT JOIN proyecto ON  "
    + "WHERE id_usuario = ?", [id_usuario]);
  res.json({ data: reSql })
  //console.log(reSql)
}

exports.updateProyectos = async (req, res) => {
  const { id } = req.params;
  const updateProyectos = req.body;
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
