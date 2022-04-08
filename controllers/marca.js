const { response } = require("express");
const pool = require("../src/db");
const marca = {};

//Función para agregar atributos en la tabla marca---------------------------------------------------
marca.insert_marca = async (req,res) =>{
    const {proveedor_id} = req.params;
    const new_marca = req.body;
    var err;
    //console.log(req.body)
    //new_marca.marca_nombre = "PTN"; //Dato para prueba 
    try{
      const resMarca = await pool.query('INSERT INTO marca SET ?', [new_marca]);
      res.json({
        msg: 'Marca agregada exitosamente',
        estado: true,
        data: resMarca
      });
    } catch (error){
      console.log("Error identificado:",error);
      err = error;
  
      res.json({
       msg:'Error al insertar un nuevo colaborador',
       error:err
     });
    }

    const new_pm = {
    pm_id_proveedor:proveedor_id,
    pm_id_marca:resMarca.insertId } 

    await pool.query('INSERT INTO proveedor_marca SET ?', [new_pm]); 

    res.json({
        msg: "Marca agregada exitosamente",
        estado: true,
    });
}

//---------------------------------------------------------------------------------------------------

//Función para editar atributos en la tabla marca---------------------------------------------------
marca.update_marca = async (req, res) => {
    //const { marca_id = 3 } = req.params; //Dato para prueba
    const { marca_id } = req.params;
    const { marca_nombre } = req.body;
    const edit_marca = { marca_nombre };
    await pool.query("UPDATE marca set ?  WHERE marca_id = ?", [edit_marca, marca_id]);
    res.json({msg: "Marca editada exitosamente",estado: true,});
  };
//--------------------------------------------------------------------------------------------------

//Función para eliminar atributos en la tabla marca---------------------------------------------------
marca.delete_marca = async (req, res) => {
    //const { marca_id = 3 } = req.params; //Dato para prueba
    const { marca_id } = req.params;
    await pool.query("DELETE FROM marca WHERE marca_id = ?", [marca_id]);
    res.json({
      msg: "Marca eliminada exitosamente",
      estado: true,
    });
  };
//----------------------------------------------------------------------------------------------------

//Función para consultar los datos de la tabla marca dependiendo de un proveedor---------------------------------------------------
marca.viewProvMarca = async (req, res) => {
  //console.log(req.params)
  const {proveedor_id} = req.params;
  const resProv = await pool.query(
    "SELECT marca_id, marca_nombre FROM proveedor "
    +"RIGHT JOIN proveedor_marca ON pm_id_proveedor = proveedor_id "
    +"RIGHT JOIN marca ON pm_id_marca = marca_id " 
    +"WHERE proveedor_id = ?", [proveedor_id]);
  res.json({
    data:resProv
  });
  //console.log("soy resProv:",resProv)
};
//---------------------------------------------------------------------------------------------------------------------------------

module.exports = marca;
