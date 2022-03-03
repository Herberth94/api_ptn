const pool = require('../src/db');

exports.insertColaborador = async(req,res)=>{
     /* ID DE USUARIO LOGEADO , INGRESA UN NUEVO DATO A LA TABLA USUARIO_COLABORADOR */   
    const  {id} = req.params
    const DataColaborador = req.body.colab_id_proyecto;
    const data ={
      colab_id_usuario:id,
      colab_id_proyecto:DataColaborador
  }
     /* INSERCCION DE DATOS A TABLA COLABORADORES */
    const colaborador = await pool.query("INSERT INTO colaboradores set ?",data );
    /* DATOS PARA INGRESAR EN LA TABLA USUARIOS_PROYECTOS  */
   res.json({
       msg: 'colaborador agregado',
       estado: true
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
