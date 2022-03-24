const { response } = require("express");
const pool = require("../src/db");

exports.insertPartida = async (req, res) => {
  //DATOS DE PARTIDA
  const  {id} = req.params
  const newPtn = req.body;
  console.log(req.body)
  /* INSERTA DATOS A LA TABLA "PARTIDA" */
  const reSql = await pool.query("INSERT INTO partida set ?", [newPtn]);
  /* DATOS A INGRESAR EN  LA TABLA "pp" */
  const pp ={
    pp_id_proyecto:id,
    pp_id_partida:reSql.insertId // id de partida ingresada
  }
  console.log()
  /* INSERTA DATOS A LA TABLA "PP" */
  const reSql2 = await pool.query("INSERT INTO pp set ?", [pp]);
  /* DEVUELVE RESPUESTA AL FRONT LOS SIGUIENTES DATOS*/
  res.json({
    msg: "Partida Agregada",
    estado: true,
    proyecto_id:reSql.insetId //id de partida ingresada
  });
  //res.end();
};

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
exports.deletePartida=async(req,res)=>{
    const {id} =  req.params;
    await pool.query("DELETE FROM partida WHERE partida_id= ?", [id]);
    res.json({
        msg : "se eliminado la partida correctamente"
    });
};

/*== Función para consultar datos de todas las partidas de los proyectos de un determinado usuario==*/
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

/*== Función para consultar datos de una partida(s) de un determinado proyecto ==*/
exports.viewPartidaPP = async (req, res) => {
  const{proyecto_id} = req.params;
  console.log("hola, soy los params",req.params)
  const reSql = await pool.query("SELECT partida_id, partida_nombre, partida_descripcion "
  +"FROM proyecto "
  +"RIGHT JOIN pp ON pp_id_proyecto = proyecto_id "
  +"RIGHT JOIN partida ON pp_id_partida = partida_id "
  +"WHERE proyecto_id = ? "
  +"ORDER BY partida_id", [proyecto_id]);
  res.json({data:reSql});
  console.log("soy el resql de view partida PP", reSql);
  
};

