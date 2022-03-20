const pool = require('../src/db');

exports.insertProyectos = async(req,res)=>{
     /* ID DE USUARIO LOGEADO QUE INGRESA UN NUEVO PROYECTO */   
    const  {id} = req.params
    const insertProyectos = req.body;
    /* INSERCCION DE DATOS A TABLA PROYECTO */
    const proyecto = await pool.query("INSERT INTO proyecto set ?",insertProyectos);
    /* DATOS PARA INGRESAR EN LA TABLA USUARIOS_PROYECTOS  */
    const user_p ={
        up_id_usuario:id,
        up_id_proyecto:proyecto.insertId
    }
     //console.log(id);
     //console.log(user_p);
    /* INSERCCION DE DATOS A LA TABLA USUARIOS_PROYECTOS  */
    const usuario_p= await pool.query("INSERT INTO usuarios_proyectos set ?",user_p);
    res.json({
       msg: 'Proyecto agregado',
       estado: true,
       id_proyecto:proyecto.insertId
  });
};

exports.updateProyectos = async(req,res)=>{
    const {id}= req.params ;     
    const updateProyectos =req.body;
         await pool.query("UPDATE proyecto set ? WHERE proyecto_id = ?",[updateProyectos,id]);
         res.json({
                 msg: 'Proyectos  se estan modificando',
                 estado: true
         })
  };

  exports.deleteProyectos= async(req,res)=>{
    const {id} = req.params;
  await pool.query("DELETE FROM proyecto WHERE proyecto_id = ?",[id]);
  res.json({
          msg: 'proyectos eleminados',
          estado :true
  })  
}
