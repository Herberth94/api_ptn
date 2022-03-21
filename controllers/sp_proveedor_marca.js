const { response } = require("express");
const pool = require("../src/db");
const sppm = {};

//Función para agregar atributos en la tabla sp_proveedor_marca---------------------------------------------------
sppm.insert_sppm = async (req,res) =>{
    const new_sppm= {
        sppm_id_sp,
        sppm_id_proveedor,
        sppm_id_marca} = req.body;
    // new_pm.pm_id_proveedor = 4; //Dato para prueba 
    // new_pm.pm_id_marca = 4; //Dato para prueba
    await pool.query('INSERT INTO sp_proveedor_marca SET ?', [new_sppm]); 
}
//-------------------------------------------------------------------------------------------------------------

 
//Función para eliminar atributos en la tabla proveedor_marca---------------------------------------------------
sppm.delete_sppm = async (req, res) => {
    const { sppm_id } = req.params;
    //const { pm_id = 1 } = req.params; //Dato para prueba
    await pool.query("DELETE FROM sp_proveedor_marca WHERE sppm_id = ?", [sppm_id]);
};
//------------------------------------------------------------------------------------------------------------
module.exports = sppm;