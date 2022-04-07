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
};

exports.viewdpropd = async (req,res) => {
    const { idProyecto } = req.params;
    console.log(req.params)
    const reSql = await pool.query("SELECT * FROM proporcionalidad WHERE pd_id_proyecto = ? ", [idProyecto]);
    res.json({data : reSql});
    console.log(reSql)
};
 exports.updateProporcionalidad = async (req, res) => {
     const { idProyecto } = req.params;
     const updateProporcionalidad = req.body;
     const reSql = await pool.query("UPDATE proporcionalidad set ? WHERE pd_id_proyecto = ? ", [updateProporcionalidad, idProyecto]);

     res.json({
         msg: 'Proporcionalidad actualizada correctamente',
         estado: true,
         data:reSql
     });
     console.log(reSql)
 }