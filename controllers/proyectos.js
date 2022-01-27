const pool = require('../src/db');
const {response} = require('express');

exports.insertProyectos = async(req,res)=>{
    const insertProyectos = req.body;
    await pool.query("INSERT INTO proyectos set ?",insertProyectos);

    res.json({
       msg: 'Proyecto agregado',

       estado: true
   });


};

exports.updateProyectos = async(req,res)=>{
    const {id}= req.params ;     
    const updateProyectos =req.body;
         await pool.query("UPDATE proyectos set ? WHERE id_usuario=?",[updateProyectos,id]);

         res.json({
                 msg: 'Proyectos  se estan modificando',
                 estado: true
         })
  };

  exports.deleteProyectos= async(req,res)=>{
    const {id} = req.params;
  await pool.query("DELETE FROM proyectos WHERE id_usuario= ?",[id]);
  res.json({
          msg: 'proyectos eleminados',
          estado :true
  })  
}
