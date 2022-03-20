const { response } = require("express");
const pool = require("../src/db");
const marca = {};

//Función para agregar atributos en la tabla marca---------------------------------------------------
marca.insert_marca = async (req,res) =>{
    const {proveedor_id} = req.params;
    const new_marca = { marca_nombre} = req.body;
    console.log(req.body)
    //new_marca.marca_nombre = "PTN"; //Dato para prueba 
    const resMarca = await pool.query('INSERT INTO marca SET ?', [new_marca]);

    const new_pm = {
    pm_id_proveedor:proveedor_id,
    pm_id_marca:resMarca.insertId } 

    await pool.query('INSERT INTO proveedor_marca SET ?', [new_pm]); 

    res.json({
        msg: "Marca agregada exitosamente",
        estado: true,
    });
}

//---------------------------------------------------------------------------------------------------

//Función para editar atributos en la tabla marca---------------------------------------------------
marca.update_marca = async (req, res) => {
    //const { marca_id = 3 } = req.params; //Dato para prueba
    const { marca_id } = req.params;
    const edit_marca = { marca_nombre } = req.body;
    //edit_marca.marca_nombre = "PTNNNN"; //Dato para prueba
    await pool.query("UPDATE marca set ?  WHERE marca_id = ?", [edit_marca, marca_id]);
    res.json({
      msg: "Marca editada exitosamente",
      estado: true,
    });
  };
//--------------------------------------------------------------------------------------------------

//Función para eliminar atributos en la tabla marca---------------------------------------------------
marca.delete_marca = async (req, res) => {
    //const { marca_id = 3 } = req.params; //Dato para prueba
    const { marca_id } = req.params;
    await pool.query("DELETE FROM marca WHERE marca_id = ?", [marca_id]);
    res.json({
      msg: "Marca eliminada exitosamente",
      estado: true,
    });
  };
//----------------------------------------------------------------------------------------------------

module.exports = marca;
