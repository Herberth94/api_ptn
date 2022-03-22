const pool = require('../src/db');
const { response } = require('express');
const am = {};

//Función para agregar atributos en la tabla am---------------------------------------------------
am.insert_am = async (req, res) => {
        const { id } = req.params;
        const new_am = {
                am_valor_dolar,
                // am_desc_cliente,
                // am_margen_ganancia,
                // am_desc_fabrica,
                am_id_proyecto
        } = req.body;
        new_am["am_id_proyecto"] = id
        console.log(req.body)
        console.log(req.params)
        console.log(new_am)
        //new_am.am_valor_dolar = 21.22; //Dato prueba para inserción
        //new_am.am_id_proyecto = 1; //Dato prueba para inserción
        await pool.query('INSERT INTO am SET ?', [new_am]);
        res.json({
                msg: "AM agregado exitosamente",
                estado: true,
        });
}
//------------------------------------------------------------------------------------------------


//Función para editar atributos en la tabla am---------------------------------------------------
am.update_am = async (req, res) => {
        const {
                am_id, //= 1,
                new_id_proyecto
        } = req.params;
        const edit_am = {
                am_valor_dolar,
                am_desc_cliente,
                am_margen_ganancia,
                am_desc_fabrica,
                am_id_proyecto: new_id_proyecto
        } = req.body;
        //edit_am.am_valor_dolar = 20.20;
        //edit_am.am_id_proyecto = 2;
        await pool.query("UPDATE am set ?  WHERE am_id = ?", [edit_am, am_id]);
        res.json({
                msg: "AM editado exitosamente",
                estado: true,
        });
};
//-----------------------------------------------------------------------------------------------

//Función para eliminar atributos en la tabla am---------------------------------------------------
am.delete_am = async (req, res) => {
        //const { am_id = 1 } = req.params; //Dato para prueba
        const { am_id } = req.params;
        await pool.query("DELETE FROM am WHERE am_id = ?", [am_id]);
        res.json({
                msg: "AM eliminado exitosamente",
                estado: true,
        });
};
//-------------------------------------------------------------------------------------------------
//Función para visualizar los atributos para rellenar la tabla de resumen del am
am.view_resumen_am = async (req,res) => {
        const{proyecto_id} = req.params;
        console.log("hola, soy los el id proyecto",req.params)
        const reSql = await pool.query("SELECT partida_id, partida_nombre, partida_descripcion, psp_id, psp_id_sp, sp_id_precio, "
        + " precio_total, precio_id_moneda "
        + "FROM proyecto "
        + "RIGHT JOIN pp ON pp_id_proyecto = proyecto_id "
        + "RIGHT JOIN partida ON pp_id_partida = partida_id "
        + "RIGHT JOIN psp ON partida_id = psp_id_partida "
        + "RIGHT JOIN servicio_producto ON psp_id_sp = sp_id "
        + "RIGHT JOIN precio ON sp_id_precio = precio_id "
        + "WHERE proyecto_id = ? ", [proyecto_id]);
        res.json({data:reSql});
        console.log("soy el resql de view resumen am", reSql)

}

module.exports = am;