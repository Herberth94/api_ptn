const { response } = require("express");
const pool = require("../src/db");

/*==================================================== CRUD - Tabla partida ====================================================*/
/*========================== Create ==========================*/
exports.insertPartida = async (req, res) => {
  const {id} = req.params //Id proyecto
  const newPartida = req.body; // Datos para la tabla partida 
  //Inserción a la tabla partida
  const reSql = await pool.query("INSERT INTO partida set ?", [newPartida]);
  // Datos para la tabla pp
  const pp ={
    pp_id_proyecto:id,
    pp_id_partida:reSql.insertId // id de partida ingresada
  };
  //Inserción para la tabla pp
  await pool.query("INSERT INTO pp set ?", [pp]);
  //Datos para la tabla am
  const dataAM = {
    am_id_partida:reSql.insertId,
    am_desc_cliente:'0',
    am_margen_ganancia:'32',
    am_cantidad:'1',
    am_descuento_fabrica:'0'
  };
  //Inserción a la tabla am
  await pool.query("INSERT INTO am set ?", [dataAM]);

  res.json({msg: "Partida Agregada", estado: true});
};
/*============================================================*/

/*========================== Read ==========================*/
//Función para consultar datos de todas las partidas de todos los proyectos que tiene un determinado usuario 
exports.viewPartida_UP = async (req, res) => {
  const{id_usuario} = req.params;
  const reSql = await pool.query(
    "SELECT partida_id, partida_nombre, partida_descripcion "
    +"FROM usuarios "
    +"LEFT JOIN usuarios_proyectos ON up_id_usuario = id_usuario "
    +"RIGHT JOIN proyecto ON up_id_proyecto = proyecto_id "
    +"RIGHT JOIN pp ON pp_id_proyecto = proyecto_id "
    +"RIGHT JOIN partida ON pp_id_partida = partida_id "
    +"WHERE id_usuario = ? "
    +"ORDER BY partida_id", [id_usuario]);
  res.json({data:reSql});
  console.log({data:reSql})
};

//Función para consultar datos de las partidas de un determinado proyecto
exports.viewPartidaPP = async (req, res) => {
  const{proyecto_id} = req.params;
  console.log("hola, soy los params",req.params)
  const reSql = await pool.query(
   "SELECT partida_id, partida_nombre, partida_descripcion "
  +"FROM proyecto "
  +"RIGHT JOIN pp ON pp_id_proyecto = proyecto_id "
  +"RIGHT JOIN partida ON pp_id_partida = partida_id "
  +"WHERE proyecto_id = ? "
  +"ORDER BY partida_id", [proyecto_id]);
  res.json({data:reSql});
};
/*==========================================================*/

/*========================== Update ==========================*/
exports.updatePartida = async (req, res) => {
  const { id } = req.params;
  const {partida_nombre, partida_descripcion} = req.body;
  const editptnBom = {
    partida_nombre,
    partida_descripcion
  };
  const updaetsql = await pool.query("UPDATE partida set ? WHERE partida_id = ?",[editptnBom, id]);
  res.json({
    msg: "se actualizo correctamente",
    estado: true,
  });
};
/*============================================================*/

/*========================== Delete ==========================*/
exports.deletePartida=async(req,res)=>{
    const {id} =  req.params;
    await pool.query("DELETE FROM partida WHERE partida_id= ?", [id]);
    res.json({
        msg : "se eliminado la partida correctamente"
    });
};
/*============================================================*/
/*==================================================================================================================================*/
