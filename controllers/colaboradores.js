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
// ver la lista de los colaboradores con el nombre de los proyectos donde son colaboradores
exports.viewColaboradores = async(req, res)=>{
  const {id_usuario} = req.params;
  const reSql = await pool.query("SELECT id_usuario, email, colab_id, colab_id_proyecto, colab_id_usuario, email, proyecto_clave "
  +"FROM usuarios "
  +"LEFT JOIN usuarios_proyectos ON up_id_usuario = id_usuario "
  +"RIGHT JOIN colaboradores ON id_usuario = colab_id_usuario "
  +"RIGHT JOIN proyecto ON  proyecto_id = up_id_proyecto AND colab_id_proyecto "
  //+"RIGHT JOIN proyecto ON  "
  +"WHERE id_usuario = ?", [id_usuario]);
  res.json({data:reSql})
  console.log(reSql)
}

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
