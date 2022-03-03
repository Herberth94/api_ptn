const { response } = require("express");
const pool = require("../src/db");
const pm = {};

//Función para agregar atributos en la tabla proveedor_marca---------------------------------------------------
pm.insert_pm = async (req,res) =>{
    const {new_id_proveedor, new_id_marca } = req.params;
    const new_pm = {
    pm_id_proveedor: new_id_proveedor,
    pm_id_marca: new_id_marca } = req.body;
    // new_pm.pm_id_proveedor = 4; //Dato para prueba 
    // new_pm.pm_id_marca = 4; //Dato para prueba
    await pool.query('INSERT INTO proveedor_marca SET ?', [new_pm]); 
}
//-------------------------------------------------------------------------------------------------------------

//Función para editar atributos en la tabla proveedor_marca---------------------------------------------------
pm.update_pm = async (req, res) => {
    const { 
        pm_id, 
        new_pm_id_proveedor, 
        new_pm_id_marca } = req.params;
    //const { pm_id = 1 } = req.params; //Dato para prueba
    const edit_pm = { 
        pm_id_proveedor:new_pm_id_proveedor, 
        pm_id_marca: new_pm_id_marca 
    } = req.body;
    // edit_pm.pm_id_proveedor = 5; //Dato para prueba
    // edit_pm.pm_id_marca = 5; //Dato para prueba
    await pool.query("UPDATE proveedor_marca set ?  WHERE pm_id = ?", [edit_pm, pm_id]);
};
//------------------------------------------------------------------------------------------------------------

//Función para eliminar atributos en la tabla proveedor_marca---------------------------------------------------
pm.delete_pm = async (req, res) => {
    const { pm_id } = req.params;
    //const { pm_id = 1 } = req.params; //Dato para prueba
    await pool.query("DELETE FROM proveedor_marca WHERE pm_id = ?", [pm_id]);
};
//------------------------------------------------------------------------------------------------------------
module.exports = pm;