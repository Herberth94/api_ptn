const pool = require( '../src/db');
const{response} = require('express');
const ci = {};
/*==================================================== CRUD - Tabla costos_indirectos ====================================================*/
/*========================== Create ==========================*/
ci.insert_ci = async (req,res) =>{
        const {ci_id_cci,ci_porcentaje,ci_id_proyecto} = req.params; 
        const new_ci = {
                ci_id_cci,
                ci_porcentaje,
                ci_id_proyecto
        }
        await pool.query('INSERT INTO costos_indirectos SET ?', [new_ci]);
        res.json({msg: "Costo indirecto agregado exitosamente",estado: true});
};
/*============================================================*/

/*========================== Read ==========================*/
//Función para consultar los porcentajes de los cosos indirectos que tiene un determinado proyecto
ci.viewCIP = async (req,res) => {
        const{proyecto_id} = req.params;
        const reSql = await pool.query(
          "SELECT ci_id_cci,cci_nombre,ci_porcentaje "
        + "FROM proyecto "
        + "RIGHT JOIN costos_indirectos ON ci_id_proyecto = proyecto_id "
        + "RIGHT JOIN categorias_ci ON ci_id_cci = cci_id "
        + "WHERE proyecto_id = ? ", [proyecto_id]);
        res.json({data:reSql});
}
/*==========================================================*/

/*========================== Update ==========================*/
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
/*============================================================*/
    
module.exports = ci;
/*========================================================================================================================================*/