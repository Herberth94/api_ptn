const pool = require( '../src/db');
const{response} = require('express');
const ci = {};

//Función para agregar atributos en la tabla costos_indirectos------------------------------------
ci.insert_ci = async (req,res) =>{
        const {ci_id_cci,ci_porcentaje,ci_id_proyecto} = req.params; 
        const new_ci = {
                ci_id_cci,
                ci_porcentaje,
                ci_id_proyecto
        }
        await pool.query('INSERT INTO costos_indirectos SET ?', [new_ci]);
        res.json({msg: "Costo indirecto agregado exitosamente",estado: true});
}
//------------------------------------------------------------------------------------------------

    
//Función para editar atributos en la tabla costos_indirectos------------------------------------
ci.update_ci = async (req, res) => {
        const {
                ci_id, //= 1, //Dato para prueba
                new_id_proyecto
        } = req.params; 
        const edit_ci = { 
            ci_descripcion,
            ci_costo,
            ci_id_am: new_id_am
        } = req.body;
        //edit_ci.ci_descripcion = 'Costo indirecto 2'; //Dato para prueba
        //edit_ci.ci_costo = 100; //Dato para prueba
        await pool.query("UPDATE costos_indirectos set ?  WHERE ci_id = ?", [edit_ci, ci_id]);
        res.json({
          msg: "Costo indirecto editado exitosamente",
          estado: true,
        });
};
//-----------------------------------------------------------------------------------------------

//Función para eliminar atributos en la tabla costos_indirectos------------------------------------
ci.delete_ci = async (req, res) => {
        const { ci_id = 1 } = req.params; //Dato para prueba
        //const { ci_id } = req.params;
        await pool.query("DELETE FROM costos_indirectos WHERE ci_id = ?", [ ci_id]);
        res.json({
          msg: "Costo indirecto eliminado exitosamente",
          estado: true,
        });
};
//-------------------------------------------------------------------------------------------------
    
module.exports = ci;