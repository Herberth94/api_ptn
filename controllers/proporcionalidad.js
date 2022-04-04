const pool = require('../src/db');

exports.insertProporcionalidad = async (req,res) => {
    const { idProyecto } = req.params;
    let id = parseInt(idProyecto)
    console.log(req.params)
    console.log(id)
    const {pd_tasa_interes, pd_anio_financiamiento, pd_pagos_anuales} = req.body;
    console.log(req.body);
    const dataEnviar = {
        pd_tasa_interes,
        pd_anio_financiamiento,
        pd_pagos_anuales,
        pd_id_proyecto : id
    }
    const reSql = await pool.query("INSERT INTO proporcionalidad set ? ", [dataEnviar]);
    res.json({
        msg: 'Proporcionalidad agregada exitosamente',
        estado:true,
        data : reSql
    });

}