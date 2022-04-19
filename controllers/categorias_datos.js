
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