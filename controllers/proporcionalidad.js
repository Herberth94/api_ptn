const pool = require('../src/db');

exports.insertProporcionalidad = async (req,res) => {
    const { idProyecto } = req.params;
    let id = parseInt(idProyecto)
    //console.log(req.params)
    //console.log(id)
    const {pd_tasa_interes, pd_anio_financiamiento, pd_pagos_anuales} = req.body;
    console.log(req.body);
    const dataEnviar = {
        pd_tasa_interes,
        pd_anio_financiamiento,
        pd_pagos_anuales,
        pd_id_proyecto : id
    }
    var err;
    try{
  
        console.log(id)
        const existeProporcionalidad = await pool.query('SELECT pd_id FROM proporcionalidad WHERE pd_id_proyecto = ?', [id])
        if (existeProporcionalidad != ''){
            console.log("existeProporcionalidad:", existeProporcionalidad)
            res.json({
                msg: 'Ya existe un registro de Financiamiento en este proyecto, por favor intente con otro',
                estado: false,
                data: existeProporcionalidad
            })
        }else{
            const reSql = await pool.query("INSERT INTO proporcionalidad set ? ", [dataEnviar]);
            res.json({
                msg: 'Proporcionalidad agregada exitosamente',
                estado:true,
                data : reSql
            });
        } 
    }catch (error) {
        console.log("Error identificado:", error);
        err = error;

        res.json({
            msg:'Error al insertar la proporcionalidad en este proyecto, por favor verifique que los datos sean correctos',
            error: err
        });

    }
};

exports.viewdpropd = async (req,res) => {
    const { idProyecto } = req.params;
    //console.log(req.params)
    const reSql = await pool.query("SELECT * FROM proporcionalidad WHERE pd_id_proyecto = ? ", [idProyecto]);
    res.json({data : reSql});
    //console.log(reSql)
};
 exports.updateProporcionalidad = async (req, res) => {
     const { idProyecto } = req.params;
     const updateProporcionalidad = req.body;
     console.log(updateProporcionalidad)
     try{
        const reSql = await pool.query("UPDATE proporcionalidad set ? WHERE pd_id_proyecto = ? ", [updateProporcionalidad, idProyecto]);
        res.json({
            msg: 'Proporcionalidad actualizada correctamente',
            estado: true,
            data:reSql
        });
        console.log(reSql)

     }catch (error) {
        console.log("Error identificado:",error);
         err = error;
    
         res.json({
          msg:'Error al modificar la proporcionalidad en este proyecto, por favor verifique que los datos sean correctos',
          error:err
        });
      }


 }