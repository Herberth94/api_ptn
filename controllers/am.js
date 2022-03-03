const pool = require( '../src/db');

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
//------------------------------------------------------------------------------------------------

    
//Función para editar atributos en la tabla am---------------------------------------------------
am.update_am = async (req, res) => {
        const {
                am_id, //= 1,
                new_id_proyecto
        } = req.params; 
        const edit_am = { 
                am_valor_dolar,
                am_desc_cliente,
                am_margen_ganancia,
                am_desc_fabrica,
                am_id_proyecto: new_id_proyecto
        } = req.body;
        //edit_am.am_valor_dolar = 20.20;
        //edit_am.am_id_proyecto = 2;
        await pool.query("UPDATE am set ?  WHERE am_id = ?", [edit_am, am_id]);
        res.json({
          msg: "AM editado exitosamente",
          estado: true,
        });
      };
//-----------------------------------------------------------------------------------------------
    
//Función para eliminar atributos en la tabla am---------------------------------------------------
am.delete_am = async (req, res) => {
        //const { am_id = 1 } = req.params; //Dato para prueba
        const { am_id } = req.params;
        await pool.query("DELETE FROM am WHERE am_id = ?", [ am_id]);
        res.json({
          msg: "AM eliminado exitosamente",
          estado: true,
        });
};
//-------------------------------------------------------------------------------------------------
    
    module.exports = am;