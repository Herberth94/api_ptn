const pool = require( '../src/db');
const{response} = require('express');


exports.insertAm = async(req,res)=>{
    const insertAm = req.body;
   await pool.query("INSERT INTO am set ?",insertAm);
   
   res.json({
           msg:"se agregado correctamente am",
           estado:true
   })
}

exports.updateAm = async(req,res)=>{
    const {id}= req.params; 
    const updateAm = req.body;
   await pool.query("UPDATE am set ? WHERE id_am=?",[updateAm,id]);
   
   res.json({
           msg:"se modifico  am",
           estado:true
   })
}

exports.deleteAm= async(req,res)=>{
                 const {id}= req.params;
                 await pool.query("DELETE FROM am WHERE id_am= ?",[id]);
                 res.json({
                         msg:"se elimino am"
                 })

         }