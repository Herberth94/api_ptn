const { response } = require("express");
const pool = require("../src/db");

exports.postPtmBom = async (req, res) => {
  const newPtn = req.body;

  const sql = await pool.query("INSERT INTO ptn_bom set ?", [newPtn]);
  res.json({
    msg: "Partida Agregada",

    estado: true,
  });
  //res.end();
};

exports.updatePtmBom = async (req, res) => {
  const { id } = req.params;
  const editptnBom = req.body;

  const updaetsql = await pool.query(
    "UPDATE ptn_bom set ? WHERE id_ptn_bom=?",
    [editptnBom, id]
  );
  res.json({
    msg: "se actualizo correctamente",
    estado: true,
  });
};
exports.deletePtnBom=async(req,res)=>{
    const {id} =  req.params;
    await pool.query("DELETE FROM ptn_bom WHERE id_ptn_bom= ?", [id]);
    res.json({
        msg : "se eliminado la partida correctamente"
    });
};
