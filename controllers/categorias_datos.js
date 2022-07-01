
const { response } = require("express");
const pool = require("../src/db");
const catd = {};

/*==================================================== CRUD - Tabla categorias_datos ====================================================*/
/*========================== Create ==========================*/
catd.insertCatsD = async (req, res) => {
  const { proyecto_id } = req.params;
  const newCatsD = {
    cd_id_cats,
    cd_no_parte,
    cd_descripcion,
    cd_meses,
    cd_semanas,
    cd_comentarios
  } = req.body;
  try {
    if (cd_id_cats !== '') {
      const resCatId = await pool.query('INSERT INTO categorias_datos SET ?', [newCatsD]);

      const new_pc = {
        pc_id_proyecto: proyecto_id,
        pc_id_cat_d: resCatId.insertId
      }
      await pool.query('INSERT INTO proyectos_cat_d SET ?', [new_pc]);

      res.json({
        data: resCatId,
        msg: "Se agregaron los datos de una categoria correctamente",
        estado: true,
      });

    } else {
      res.json({
        msg: "¡ERROR!,Tienes que seleccionar una categoría",
        estado: true,
      });

    }


  } catch (error) {
    console.log("Error identificado:", error);
    err = error;

    res.json({
      msg: 'Error al insertar una nueva categoría',
      error: err
    });
  }

}

// Función para agregar servicios/productos multiples
catd.multiCD = async (req, res) =>{

  let resAMC = 0;
  let resCD = 0;
  let resPC = 0;
  let resPrecio = 0;

  let errAMC = 0;
  let errCD = 0;
  let errPC = 0;
  let errPrecio = 0;


  let {proyecto_id} = req.params;
  let newCatsD = req.body;

  //console.log(newCatsD);
  /* =============== Separación de Datos de categorías ===============*/
  //Obtención del numero de objetos
  let l = Object.keys(newCatsD);
  l = l.length;

  /* ===== Objetos iniciales ===== */
  let precio = {
    precio_lista:'',
    precio_unitario:'',
    precio_descuento:'',
    precio_total:'',
    precio_id_moneda:''
  };

  let cd = {
    cd_id_cats:'',
    cd_no_parte:'',
    cd_descripcion:'',
    cd_meses:'',
    cd_semanas:'',
    cd_cantidad:'',
    cd_id_precio:'',
    cd_comentarios:''
  };

  let pc = {
    pc_id_proyecto:proyecto_id,
    pc_id_cat_d:''
  };

  let amc = {
    amc_id_proyecto:proyecto_id,
    amc_id_cats:''
  };
  /* ============================= */

  /* ===== Arreglos de objetos para las inserciones ===== */
  let newPrecio = [];
  let newCD = [];
  let newPC = [];
  let newAMC = [];
  /* ==================================================== */

  /* ===== Incialización de los arreglos ===== */
  newPrecio = Array(l).fill(precio);
  newCD = Array(l).fill(cd);
  newPC = Array(l).fill(pc);
  newAMC = Array(4).fill(amc);
  //console.log('Arreglo newPrecio: ',newPrecio);
  //console.log('Arreglo newAMC: ',newAMC);
  /* ========================================= */
  
  /* ===== Inserciónes ===== */
  let c1 = 0;
  for(let c = 0; c < 4 ; c++){
    c1 = c1 + 1;
    newAMC[c].amc_id_cats = c1;
    
    try {
      await pool.query('INSERT INTO am_cats SET ?', [newAMC[c]]);
      resAMC = resAMC + 1;
    } catch (error) {
      errAMC = errAMC + 1;
    }
    //console.log(`Arreglo newAMC ${c}: `,newAMC[c]);
  }

  for(let c = 0 ; c < l ; c++){
    newPrecio[c].precio_id_moneda = newCatsD[c].moneda;
    newPrecio[c].precio_descuento = newCatsD[c].precio_descuento;
    newPrecio[c].precio_lista = newCatsD[c].precio_lista;
    newPrecio[c].precio_unitario = newCatsD[c].precio_unitario;
    newPrecio[c].precio_total = newCatsD[c].total;

    try {
      let precios = await pool.query("INSERT INTO precio SET ?",[newPrecio[c]]);
      newCD[c].cd_id_precio = precios.insertId; 
      resPrecio = resPrecio + 1;
    } catch (error) {
      errPrecio = errPrecio + 1;
    }

    //console.log(`Arreglo newPrecio ${c}: `,newPrecio[c]); 

    newCD[c].cd_id_cats = newCatsD[c].categoria;
    newCD[c].cd_no_parte = newCatsD[c].n_parte;
    newCD[c].cd_descripcion = newCatsD[c].descripcion;
    newCD[c].cd_meses = newCatsD[c].meses;
    newCD[c].cd_semanas = newCatsD[c].semanas;
    newCD[c].cd_cantidad = newCatsD[c].semanas;
    newCD[c].cd_comentarios = newCatsD[c].comentarios;

    

    
    try {
      let insertCD = await pool.query("INSERT INTO categorias_datos SET ?",[newCD[c]]);
      newPC[c].pc_id_cat_d = insertCD.insertId;
      resCD = resCD + 1;
    } catch (error) {
      errCD = errCD + 1;
    }

    try {
      await pool.query("INSERT INTO proyectos_cat_d SET ?",[newPC[c]]);
      resPC = resPC + 1;
    } catch (error) {
      errPC = errPC + 1;
    }

    // console.log(`Arreglo newPrecio ${c}:`,newPrecio[c]);
    // console.log(`Arreglo newCD ${c}:`,newCD[c]);
    // console.log(`Arreglo newPC ${c}:`,newPC[c]);
  }
  /* ======================= */
  /* =================================================================*/

  


/* =============================================================================*/

  let msg;
    if(
        errAMC !== 0 &&
        errCD !== 0 &&
        errPC !== 0 &&
        errPrecio !== 0 
    ){
      msg = `No. de Datos de categorias No insertados: ${errCD}`
      + `No. de Datos AM de categorias NO insertados: ${errAMC}`
      + `No. de Precios No insertados: ${errPrecio}`
      + `No de Relaciones Proyecto - Datos categorias No insertadas: ${errPC}`
      res.json({
        msg:msg
      })
    }else{
      msg = `No. de Datos de categorias insertados: ${resCD}`
      + `No. de Datos AM de categorias insertados: ${resAMC}`
      + `No. de Precios insertados: ${resPrecio}`
      + `No de Relaciones Proyecto - Datos categorias insertadas: ${resPC}`
      res.json({
        msg:msg
      })
    }
}
/*============================================================*/

/*========================== Read ==========================*/
//Función para consultar los datos de las categorias de un determinado proyecto
catd.viewCatsD = async (req, res) => {
  const { proyecto_id } = req.params;
  const reSql = await pool.query(
    "SELECT cd_id,cd_id_cats,cat_nombre,cd_no_parte,cd_descripcion,cd_semanas,cd_meses,cd_comentarios "
    + "FROM proyecto "
    + "RIGHT JOIN proyectos_cat_d ON proyecto_id = pc_id_proyecto "
    + "RIGHT JOIN categorias_datos ON pc_id_cat_d = cd_id "
    + "RIGHT JOIN categorias_c_a_sptn_ma ON cd_id_cats = cat_id "
    + "WHERE proyecto_id = ? "
    + "ORDER BY cd_id_cats", [proyecto_id]);
  res.json({ data: reSql })
};

//Función para consultar los No. de parte 
catd.viewDataCatsNP = async (req, res) => {
  const reSql = await pool.query("SELECT cd_no_parte FROM categorias_datos");
  //console.log(reSql)
  res.json({ data: reSql })
};

//Función para consultar las descripciones 
catd.viewDataCatsDes = async (req, res) => {
  const reSql = await pool.query("SELECT cd_descripcion FROM categorias_datos");
  //console.log(reSql)
  res.json({ data: reSql })
};
/*==========================================================*/

/*========================== Update ==========================*/
catd.updateCatsD = async (req, res) => {
  const { cd_id } = req.params;
  let err;
  const {
    cd_id_cats,
    cd_no_parte,
    cd_descripcion,
    cd_meses,
    cd_semanas,
    cd_comentarios,
  } = req.body;

  const editCatsD = {
    cd_id_cats,
    cd_no_parte,
    cd_descripcion,
    cd_meses,
    cd_semanas,
    cd_comentarios,
  }
  try{
    await pool.query("UPDATE categorias_datos set ?  WHERE cd_id = ?", [editCatsD, cd_id]);
    res.json({ msg: "Datos de la categoría modificados exitosamente", estado: true, });
  }catch (error) {
    console.log("Error identificado:", error);
    err = error;

    res.json({
        msg: 'Error al modificar los datos de la categoría',
        error: err
    });
}

};

// Función para editar el atributo cd_cantidad en la tabla servicio_producto
catd.updateCdCant = async (req, res) => {
  const { cd_id } = req.params;

  const { cd_cantidad } = req.body;
  const editnewCd = { cd_cantidad }
  let err;
  try {
    await pool.query("UPDATE categorias_datos set ?  WHERE cd_id = ?", [editnewCd, cd_id]);
    res.json({
      msg: "Cantidad de la categoría editada exitosamente",
      estado: true,
    });

  }catch (error) {
    console.log("Error identificado:", error);
    err = error;

    res.json({
        msg: 'Error al modificar la cantidad',
        error: err
    });
}

};

catd.ModalCt = async(req,res)=>{
  const {proyecto_id} = req.params;
  const reSql = await pool.query ( 
    "SELECT cd_id,cat_nombre,cd_descripcion,cd_cantidad,cd_comentarios,precio_lista ,precio_unitario,moneda_nombre"
    + " FROM proyecto " 
    + " RIGHT JOIN proyectos_cat_d ON proyecto_id = pc_id_proyecto "
    + " RIGHT JOIN categorias_datos ON pc_id_cat_d = cd_id " 
    + "RIGHT JOiN precio ON cd_id_precio = precio_id "
    + "RIGHT JOIN moneda ON moneda_id = precio_id_moneda "
    + "RIGHT JOIN categorias_c_a_sptn_ma ON cd_id_cats = cat_id "
    + "WHERE proyecto_id = ? "
    + "ORDER BY cd_id_cats", [proyecto_id]);
  res.json({data:reSql})
};
/*============================================================*/

/*========================== Delete ==========================*/
// catd.delete_catt = async (req, res) => {
//   const { ct_id } = req.params;
//   await pool.query("DELETE FROM cat_totales WHERE ct_id = ?", [ ct_id]);
//   res.json({
//     msg: "Total de la categoria eliminado exitosamente",
//     estado: true,
//   });
// };
/*============================================================*/
module.exports = catd;
/*=======================================================================================================================================*/