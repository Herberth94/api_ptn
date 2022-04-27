const { response } = require("express");
const { CP850_GENERAL_CI } = require("mysql/lib/protocol/constants/charsets");
const pool = require("../src/db");
const marca = {};

//Función para agregar atributos en la tabla marca---------------------------------------------------
marca.insert_marca = async (req, res) => {
  const { proveedor_id } = req.params;
  const new_marca = req.body;
  var err;
  //console.log(req.body)
  //new_marca.marca_nombre = "PTN"; //Dato para prueba 
  try {
    const resMarca = await pool.query('INSERT INTO marca SET ?', [new_marca]);
  
    const new_pm = {
      pm_id_proveedor: proveedor_id,
      pm_id_marca: resMarca.insertId
    } 
  
    await pool.query('INSERT INTO proveedor_marca SET ?', [new_pm]);

    res.json({
      msg: 'Marca agregada exitosamente',
      estado: true,
      data: resMarca 
    });

  } catch (error) {
    console.log("Error identificado:", error);
    err = error;
    res.json({
      msg: 'Error al insertar una nueva Marca',
      error: err
    });
  }

  // res.json({
  //   msg: "Marca agregada exitosamente",
  //   estado: true,
  // });
}

//Función para agregar atributos en la tabla proveedor_marca---------------------------------------------------
marca.insert_provMarca = async (req, res) => {
  const {proveedor_id,marca_id} = req.params;
  
  const new_pm = {
    pm_id_proveedor: proveedor_id,
    pm_id_marca: marca_id
  }

  var err;
  let insertar;
  try {
    const resPM = await pool.query('SELECT * FROM proveedor_marca');
    let k = Object.keys(resPM);
    k = k.length;
    //console.log('Longitud del objeto:',k);
    let arrayNoExiste = [];
    for(let c = 0 ; c < k ; c++){
      if(parseInt(new_pm.pm_id_proveedor) === resPM[c].pm_id_proveedor && parseInt(new_pm.pm_id_marca) === resPM[c].pm_id_marca){
        arrayNoExiste[c] = false;
      }else{
        arrayNoExiste[c] = true;
      }
    }
    //console.log(arrayNoExiste);
    let notFound = arrayNoExiste.filter((array) => array === true);
    notFound = notFound.length;
    //console.log(typeof(k),k);
    //console.log(typeof(notFound),notFound);
    if(k === notFound ){
      //console.log('Si se puede insertar la Marca');
      insertar = true;
    }else{
      //console.log('No se puede insertar la Marca');
      insertar = false;
    }
  } catch (error) {}

  try {  
    if(insertar === true){
      await pool.query('INSERT INTO proveedor_marca SET ?', [new_pm]);
      res.json({
        msg: 'Marca agregada exitosamente',
        estado: true
        //data: resMarca 
      });
    }else{
      res.json({
        msg: 'El Proveedor ya cuenta con esta Marca',
        estado: true
        //data: resMarca 
      });
    }
  } catch (error) {
    //console.log("Error identificado:", error);
    err = error;
    res.json({
      msg: 'Error al insertar una nueva Marca',
      error: err
    });
  }
}

//---------------------------------------------------------------------------------------------------

//Función para editar atributos en la tabla marca---------------------------------------------------
marca.update_marca = async (req, res) => {
  //const { marca_id = 3 } = req.params; //Dato para prueba
  const { marca_id } = req.params;
  const { marca_nombre } = req.body;
  const edit_marca = { marca_nombre };
  try {
    const reSql = await pool.query("UPDATE marca set ?  WHERE marca_id = ?", [edit_marca, marca_id]);
    res.json({
      data: reSql,
      msg: "Marca modificada exitosamente",
      estado: true,
    });
  } catch (error) {
    console.log("Error identificado:", error);
    err = error;
    res.json({
      estado: false,
      msg: "¡ERROR!, Revisa que hayas ingresado correctamente los datos"
    });
  }

}

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

// Función para consultar los datos de la tabla marca de un determinado proveedor--------------
marca.viewProvMarca = async (req, res) => {
  //console.log(req.params)
  const { proveedor_id } = req.params;
  const resProv = await pool.query(
    "SELECT marca_id, marca_nombre FROM proveedor "
    + "RIGHT JOIN proveedor_marca ON pm_id_proveedor = proveedor_id "
    + "RIGHT JOIN marca ON pm_id_marca = marca_id "
    + "WHERE proveedor_id = ?", [proveedor_id]);
  res.json({
    data: resProv
  });
  //console.log("soy resProv:",resProv)
};
// Función para consultar los datos de la tabla marca
marca.viewMarcas = async (req, res) => {
  const resProv = await pool.query(
      "SELECT marca_id, marca_nombre FROM proveedor "
    + "RIGHT JOIN proveedor_marca ON pm_id_proveedor = proveedor_id "
    + "RIGHT JOIN marca ON pm_id_marca = marca_id ");
  res.json({
    data: resProv
  });
  //console.log("soy resProv:",resProv)
};
//---------------------------------------------------------------------------------------------------------------------------------

module.exports = marca;
