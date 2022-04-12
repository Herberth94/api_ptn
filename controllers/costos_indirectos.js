const pool = require('../src/db');
const { response } = require('express');
const ci = {};
/*==================================================== CRUD - Tabla costos_indirectos ====================================================*/
/*========================== Create ==========================*/
ci.insert_ci = async (req, res) => {
    const { ci_id_cci, ci_porcentaje, ci_id_proyecto } = req.params;
    const new_ci = {
        ci_id_cci,
        ci_porcentaje,
        ci_id_proyecto
    }
    await pool.query('INSERT INTO costos_indirectos SET ?', [new_ci]);
    res.json({ msg: "Costo indirecto agregado exitosamente", estado: true });
};
/*============================================================*/

/*========================== Read ==========================*/
//Función para consultar los porcentajes de los cosos indirectos que tiene un determinado proyecto
ci.viewCIP = async (req, res) => {
    const { proyecto_id } = req.params;
    const reSql = await pool.query(
        "SELECT ci_id,ci_id_cci,cci_nombre,ci_porcentaje "
        + "FROM proyecto "
        + "RIGHT JOIN costos_indirectos ON ci_id_proyecto = proyecto_id "
        + "RIGHT JOIN categorias_ci ON ci_id_cci = cci_id "
        + "WHERE proyecto_id = ? ", [proyecto_id]);
    res.json({ data: reSql });
};
/*==========================================================*/

/*========================== Update ==========================*/
ci.update_ci = async (req, res) => {
    const { ci_id } = req.params;

    const { ci_porcentaje } = req.body;

    const editCI = { ci_porcentaje };
    let err;
    try {
        const reSql = await pool.query("UPDATE costos_indirectos set ?  WHERE ci_id = ?", [editCI, ci_id]);
        res.json({ msg: "Porcentaje de costo indirecto editado exitosamente", estado: true, data: reSql });
    } catch (error) {
        console.log("Error identificado:", error);
        err = error;
        res.json({
            estado: false,
            msg: "¡ERROR al editar un costo indirecto!, Revisa que hayas ingresado correctamente los datos"
        });
    }

};
/*============================================================*/

module.exports = ci;
/*========================================================================================================================================*/