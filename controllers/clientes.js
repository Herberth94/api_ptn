const pool = require("../src/db");

exports.postClientes = async (req, res) => {
    const insertClientes = req.body;

   
    
        try {
            const cliente = await pool.query(
                'SELECT nombre_cliente FROM clientes WHERE nombre_cliente = ?',[insertClientes.nombre_cliente])
            //console.log(cliente);
            if(cliente == ''){
            await pool.query("INSERT INTO clientes set ?", insertClientes);
            res.json({
                msg: "Registro del cliente exitoso",
                estado: true,
            });
            }else{
                res.json({
                    msg: "Registro invalido, el Cliente ya se encuentra registrado"
                });
            }   
        } catch (error) {
            res.json({
                msg: 'Error al insertar un nuevo Cliente, revise que se ingresaron correctamemte todos los campos',
                error: error
            });
            
        }
     
};

exports.viewCliente = async (req, res) => {
    const reSql = await pool.query('SELECT cliente_id,nombre_cliente, razon_social,telefono,cliente_direccion FROM clientes');
    res.json({ reSql: reSql });
    //console.log(reSql)
    //res.end();
}
exports.updateClientes = async (req, res) => {
    const { id } = req.params;
    const updateCliente = req.body;
    console.log(updateCliente);
    let err;
    try {
        const cliente = await pool.query(
            'SELECT nombre_cliente FROM clientes WHERE nombre_cliente = ?',[updateCliente.nombre_cliente])
        console.log(cliente);
        if(cliente !== ''){
            await pool.query("UPDATE clientes set ? WHERE cliente_id = ?", [
                updateCliente,
                id,
            ]);
            const link = `/clientes/update/${id} `;
            res.json({
                msg: 'Cliente modificado exitosamente',
                estado: true,
            });
        }else{
            res.json({
                msg: "Modificación invalida, el Cliente ya se encuentra registrado"
            });
        }   
        
    } catch (error) {
        //console.log("Error identificado:", error);
        err = error;
        res.json({
            estado: false,
            msg: "ERROR al modificar un Cliente, Revisa que hayas ingresado correctamente los datos"
        });
    }
};

exports.deleteClientes = async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    await pool.query("DELETE FROM clientes WHERE cliente_id= ?", [id]);
    res.json({
        msg: "cliente Eliminado",

        estado: true,
    });
};
