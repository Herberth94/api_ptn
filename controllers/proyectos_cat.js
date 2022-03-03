const { response } = require("express");
const pool = require("../src/db");
const pc = {};

//Función para agregar atributos en la tabla proyectos_cat---------------------------------------------------
pc.insert_pc = async (req,res) =>{
    const {new_id_proyecto, new_id_cat} = req.params;
    const new_pc = {
    pc_id_proyecto: new_id_proyecto,
    pc_id_cat: new_id_cat 
    } = req.body;
    // new_pc.pc_id_proyecto = 1; //Dato para prueba 
    // new_pc.pc_id_cat = 2; //Dato para prueba
    await pool.query('INSERT INTO proyectos_cat SET ?', [new_pc]); 
}
//-----------------------------------------------------------------------------------------------------------

//Función para editar atributos en la tabla proyectos_cat---------------------------------------------------
pc.update_pc = async (req, res) => {
    const { 
        pc_id, 
        new_pc_id_proyecto, 
        new_pc_id_cat } = req.params;
    //const { pc_id = 2 } = req.params; //Dato para prueba
    const edit_pc = { 
        pc_id_proyecto: new_pc_id_proyecto, 
        pc_id_cat: new_pc_id_cat
    } = req.body;
    //edit_pc.pc_id_proyecto = 2; //Dato para prueba
    //edit_pc.pc_id_cat = 3; //Dato para prueba
    await pool.query("UPDATE proyectos_cat set ?  WHERE pc_id = ?", [edit_pc, pc_id]);
}
//----------------------------------------------------------------------------------------------------------

//Función para eliminar atributos en la tabla proyectos_cat---------------------------------------------------
pc.delete_pc = async (req, res) => {
    const { pc_id } = req.params;
    //const { pc_id = 2 } = req.params; //Dato para prueba
    await pool.query("DELETE FROM proyectos_cat WHERE pc_id = ?", [pc_id]);
}
//------------------------------------------------------------------------------------------------------------
module.exports = pc;