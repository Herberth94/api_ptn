const { response } = require("express");
const pool = require("../src/db");

exports.postPtmBom = async (req, res) => {
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

exports.updatePtmBom = async (req, res) => {
  const { id } = req.params;
  const editptnBom = req.body;
  const updaetsql = await pool.query("UPDATE partida set ? WHERE partida_id =?",[editptnBom, id]);
  res.json({
    msg: "se actualizo correctamente",
    estado: true,
  });
};
exports.deletePtnBom=async(req,res)=>{
    const {id} =  req.params;
    await pool.query("DELETE FROM ptn_bom WHERE partida_id= ?", [id]);
    res.json({
        msg : "se eliminado la partida correctamente"
    });
};
