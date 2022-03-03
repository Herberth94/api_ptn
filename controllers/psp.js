const pool = require( '../src/db');

exports.insertPsp = async(req,res)=>{
    const insertpsp = req.body;
    await pool.query("INSERT INTO psp set ?",insertpsp);
    res.json({
           msg:"se agregado correctamente psp",
           estado:true
   })
}