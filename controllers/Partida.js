const { response } = require("express");
const pool = require("../src/db");

/*==================================================== CRUD - Tabla partida ====================================================*/
/*========================== Create ==========================*/
exports.insertPartida = async (req, res) => {
  const { id } = req.params //Id proyecto
  const { partida_nombre, partida_descripcion } = req.body; // Datos para la tabla partida 
  //Inserción a la tabla partida
  // Datos para la tabla pp
  const newPartida = {
    partida_nombre,
    partida_descripcion
  }

  let err;
  //Inserción para la tabla pp
  try {
    if (partida_nombre !== '') {
      const nuevaPartida = await pool.query("INSERT INTO partida set ?", [newPartida]);
      res.json({
        msg: 'Partida nueva agregada exitosamente',
        estado: true,
        data: nuevaPartida
      });
      const pp = {
        pp_id_proyecto: id,
        pp_id_partida: nuevaPartida.insertId // id de partida ingresada
      };
      const reSql = await pool.query("INSERT INTO pp set ?", [pp]);

      //Datos para la tabla am
      const dataAM = {
        am_id_partida: nuevaPartida.insertId
      };
      //Inserción a la tabla am
      await pool.query("INSERT INTO am set ?", [dataAM]);
    } else {
      res.json({
        estado: false,
        msg: "¡ERROR!, Por favor ingresa el nombre de la partida"
      });
    }

    // res.json({ msg: "Partida Agregada", estado: true });
  } catch (error) {
    console.log("Error identificado:", error);
    err = error;

    res.json({
      msg: 'Error al agregar una nueva partida',
      error: err
    });
  }


};
/*============================================================*/

/*========================== Read ==========================*/
//Función para consultar datos de todas las partidas de todos los proyectos que tiene un determinado usuario 
exports.viewPartida_UP = async (req, res) => {
  const { id_usuario } = req.params;
  const reSql = await pool.query(
    "SELECT partida_id, partida_nombre, partida_descripcion "
    + "FROM usuarios "
    + "LEFT JOIN usuarios_proyectos ON up_id_usuario = id_usuario "
    + "RIGHT JOIN proyecto ON up_id_proyecto = proyecto_id "
    + "RIGHT JOIN pp ON pp_id_proyecto = proyecto_id "
    + "RIGHT JOIN partida ON pp_id_partida = partida_id "
    + "WHERE id_usuario = ? "
    + "ORDER BY partida_id", [id_usuario]);
  res.json({ data: reSql });

};

//Función para consultar datos de las partidas de un determinado proyecto
exports.viewPartidaPP = async (req, res) => {
  const { proyecto_id } = req.params;
  //console.log("hola, soy los params",req.params)
  const reSql = await pool.query(
    "SELECT partida_id, partida_nombre, partida_descripcion "
    + "FROM proyecto "
    + "RIGHT JOIN pp ON pp_id_proyecto = proyecto_id "
    + "RIGHT JOIN partida ON pp_id_partida = partida_id "
    + "WHERE proyecto_id = ? "
    + "ORDER BY partida_id", [proyecto_id]);
  res.json({ data: reSql });
};
/*==========================================================*/

/*========================== Update ==========================*/
exports.updatePartida = async (req, res) => {
  const { id } = req.params;
  const { partida_nombre, partida_descripcion } = req.body;
  const editptnBom = {
    partida_nombre,
    partida_descripcion
  };
  try{
    const updaetsql = await pool.query("UPDATE partida set ? WHERE partida_id = ?", [editptnBom, id]);
    res.json({
      msg: "Partida exitosa exitosamente",
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
/*============================================================*/

/*========================== Delete ==========================*/
exports.deletePartida = async (req, res) => {
  const { id } = req.params;

  var preciosId = await pool.query(
      'SELECT sp_id_precio FROM partida '
    + 'INNER JOIN psp ON partida_id = psp_id_partida '
    + 'INNER JOIN servicio_producto ON psp_id_sp = sp_id '
    + 'WHERE partida_id = ?', [id]);
  
 
  let i = Object.keys(preciosId);
  i = i.length;

  for(let c = 0 ; c < i ; c++){
    // console.log(preciosId[c].sp_id_precio);
    await pool.query('DELETE FROM precio WHERE precio_id = ?',[preciosId[c].sp_id_precio]);
  }

  await pool.query("DELETE FROM partida WHERE partida_id= ?", [id]);
  res.json({
    msg: "se eliminado la partida correctamente"
  });
};
/*============================================================*/
/*==================================================================================================================================*/
