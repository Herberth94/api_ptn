const { response } = require("express");
const pool = require("../src/db");
const cct = {};

//Función para agregar atributos en la tabla cat_cat_t---------------------------------------------------
cct.insert_cct = async (req,res) =>{
    const {new_cc_id_cat, new_cc_id_cat_t} = req.params;
    const new_cct = {
    cc_id_cat: new_cc_id_cat,
    cc_id_cat_t: new_cc_id_cat_t 
    } = req.body;
    //new_cct.cc_id_cat = 2; //Dato para prueba 
    //new_cct.cc_id_cat_t = 4; //Dato para prueba
    await pool.query('INSERT INTO cat_cat_t SET ?', [new_cct]); 
}
//-------------------------------------------------------------------------------------------------------

//Función para editar atributos en la tabla cat_cat_t---------------------------------------------------
cct.update_cct = async (req, res) => {
    const { 
        cc_id, //= 1, //Dato para prueba 
        new_cc_id_cat, 
        new_cc_id_cat_t } = req.params;
    
    const edit_cct = { 
        cc_id_cat,//: new_cc_id_cat,
        cc_id_cat_t//: new_cc_id_cat_t 
    } = req.body;
    //edit_cct.cc_id_cat = 3; //Dato para prueba
    //edit_cct.cc_id_cat_t = 5; //Dato para prueba
    await pool.query("UPDATE cat_cat_t set ?  WHERE cc_id = ?", [edit_cct, cc_id]);
}
//------------------------------------------------------------------------------------------------------

//Función para eliminar atributos en la tabla cat_cat_t---------------------------------------------------
cct.delete_cct = async (req, res) => {
    const { cc_id } = req.params;
    //const { cc_id = 1 } = req.params; //Dato para prueba
    await pool.query("DELETE FROM cat_cat_t WHERE cc_id = ?", [cc_id]);
}
//--------------------------------------------------------------------------------------------------------
module.exports = cct;