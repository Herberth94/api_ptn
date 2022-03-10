const pool = require("../src/db");

    exports.postClientes = async (req, res) => {
    const insertClientes = req.body;
    // console.log(req.body)
    await pool.query("INSERT INTO clientes set ?", insertClientes);
    res.json({
        msg: "Partida clientes",
        estado: true,
    });
    };

    exports.viewCliente = async(req,res)=>{
        const reSql= await pool.query('SELECT cliente_id,nombre_cliente, razon_social,telefono,cliente_direccion FROM clientes');
        res.json({reSql:reSql});
        console.log(reSql)
        //res.end();
    }
    exports.updateClientes = async (req, res) => {
        const { id } = req.params;
        const updatUsuario = req.body;
        await pool.query("UPDATE clientes set ? WHERE cliente_id=?", [
        updatUsuario,
        id,
        ]);

       const link = `/clientes/update/${id} `;
       console.log(link);
       res.json({
        msg: "modficiacion de usuario con exito ",
        estado: true,
    });
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
