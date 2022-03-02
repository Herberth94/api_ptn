const { response } = require("express");
const pool = require("../src/db");
const categoria = {};

//Función para agregar atributos en la tabla marca---------------------------------------------------
categoria.insert_cat = async (req,res) =>{
    const new_cat = { categoria_nombre} = req.body;
    //new_cat.categoria_nombre = 'Tecnolgía principal'; //Dato prueba para inserción
    const cat_id = await pool.query('INSERT INTO categoria SET ?', [new_cat]);

    //Obtención del atributo categoria_id anteriormente insertado en la tabla categoria
    // const new_sp_id_cat = {
    //     sp_id_cat: cat_id.insertId
    // }
    res.json({
        msg: "Categoria agregada exitosamente",
        estado: true,
      });
}
//---------------------------------------------------------------------------------------------------

//Función para editar atributos en la tabla marca---------------------------------------------------
categoria.update_cat = async (req, res) => {
    const { categoria_id } = req.params;
    //const { categoria_id = 1} = req.params; //Dato para prueba
    const edit_cat = { categoria_nombre } = req.body;
    //edit_cat.categoria_nombre = "Subtecnología"; //Dato para prueba
    await pool.query("UPDATE categoria set ?  WHERE categoria_id = ?", [edit_cat, categoria_id]);
    res.json({
      msg: "Categoria editada exitosamente",
      estado: true,
    });
  };
//--------------------------------------------------------------------------------------------------

//Función para eliminar atributos en la tabla marca---------------------------------------------------
categoria.delete_cat = async (req, res) => {
    //const { categoria_id = 1 } = req.params; //Dato para prueba
    const { categoria_id } = req.params;
    await pool.query("DELETE FROM categoria WHERE categoria_id = ?", [ categoria_id]);
    res.json({
      msg: "Categoria eliminada exitosamente",
      estado: true,
    });
  };
//----------------------------------------------------------------------------------------------------

module.exports = categoria;