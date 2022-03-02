const { response } = require("express");
const pool = require("../src/db");
const categorias = {};

//Función para agregar atributos en la tabla categorias_c_a_sptn_ma---------------------------------------------------
categorias.insert_cats = async (req,res) =>{
    new_cats = { cat_nombre} = req.body;
    //new_cats.cat_nombre = 'Capacitación'; //Dato para prueba
    const cats_id = await pool.query('INSERT INTO categorias_c_a_sptn_ma SET ?', [new_cats]);
    res.json({
        msg: "Categoria agregada exitosamente",
        estado: true,
      });
}
//--------------------------------------------------------------------------------------------------------------------

//Función para editar atributos en la tabla categorias_c_a_sptn_ma---------------------------------------------------
categorias.update_cats = async (req, res) => {
    const { cat_id } = req.params;
    //const { cat_id = 1} = req.params; //Dato para prueba
    const edit_cats = { cat_nombre } = req.body;
    //edit_cats.cat_nombre = "Accesorios"; //Dato para prueba
    await pool.query("UPDATE categorias_c_a_sptn_ma set ?  WHERE cat_id = ?", [edit_cats, cat_id]);
    res.json({
      msg: "Categoria editada exitosamente",
      estado: true,
    });
  };
//-------------------------------------------------------------------------------------------------------------------

//Función para eliminar atributos en la tabla categorias_c_a_sptn_ma---------------------------------------------------
categorias.delete_cats = async (req, res) => {
    const { cat_id = 1 } = req.params; //Dato para prueba
    //const { cat_id } = req.params;
    await pool.query("DELETE FROM categorias_c_a_sptn_ma WHERE cat_id = ?", [cat_id]);
    res.json({
      msg: "Categoria eliminada exitosamente",
      estado: true,
    });
  };
//---------------------------------------------------------------------------------------------------------------------

module.exports = categorias;