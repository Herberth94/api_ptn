const pool = require('../src/db');
const bcrypt = require("bcryptjs");
const formControl = {};

formControl.postForm = async (req, res) => {
    const { email, password, rol, estado_login } = req.body;
    let passwordHash = await bcrypt.hash(password, 10)
    const newUser = {
        rol,
        email,
        password: passwordHash,
        estado_login
    };
    let err;
    try {
        const Vsql = await pool.query('SELECT email FROM usuarios WHERE email = ?', [newUser.email]);
        if (Vsql != '') {

            res.json({
                msg: 'Email ya registrado intente con otro',
                estado: false
            })
        }

        else {
            const sql = await pool.query('INSERT INTO usuarios set ?', [newUser]);

            res.json({
                msg: 'Registro exitoso',
                estado: true

            });
            console.log(passwordHash)

        }
    } catch (error) {
        console.log("Error identificado:", error);
        err = error;

        res.json({
            msg: 'Error al insertar un nuevo colaborador',
            error: err
        });
    }
    //res.end();
};

formControl.viewForm = async (req, res) => {
    const reSql = await pool.query('SELECT id_usuario , rol , email,password FROM usuarios');
    res.json({ reSql: reSql });
    //res.end();
};

formControl.viewUsersVenta = async (req, res) => {
    const reSql = await pool.query('SELECT id_usuario , rol , email, password FROM usuarios WHERE rol = "venta"');
    res.json({ reSql: reSql });
    //res.end();
};

formControl.viewUsersVentaP = async (req, res) => {
    const {proyecto_id} = req.params;
    const reSql = await pool.query(
          'SELECT id_usuario,up_id,email FROM usuarios '
        + 'LEFT JOIN usuarios_proyectos ON up_id_usuario = id_usuario '
        + 'LEFT JOIN proyecto ON up_id_proyecto = proyecto_id '
        + 'WHERE rol = "venta" AND proyecto_id = ?',[proyecto_id]);
    res.json({ reSql: reSql });
};

formControl.deleteForm = async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM usuarios_proyectos WHERE up_id = ?", [id]);
    res.end();
};
formControl.editForm = async (req, res) => {
    const { id } = req.params;
    const { email, password, rol, estado_login } = req.body;
    const editvalues =
    {
        email,
        rol,
        estado_login
    };
    let err;
    try {
        const reSql = await pool.query('UPDATE usuarios set ? WHERE id_usuario=?', [editvalues, id])
        const link = `/edit/${id} `;
        console.log(link);
        // res.redirect('/api/cotizador/registro');
        res.json({
            msg: 'Usuario modificado exitosamente',
            estado: true,
            data: reSql
        });
    } catch (error) {
        console.log("Error identificado:", error);
        err = error;
        res.json({
            estado: false,
            msg: "¡ERROR!, Revisa que hayas ingresado correctamente los datos"
        });

    }
};
formControl.editPass = async (req, res) => {
    const { id } = req.params;
    const { password, estado_login } = req.body;
    let passwordHash = await bcrypt.hash(password, 10)
    let err;
    const editPass = {
        password: passwordHash,
        estado_login
    }
    try {
        const reSql = await pool.query('UPDATE usuarios set ? WHERE id_usuario=?', [editPass, id])
        res.json({
            data: reSql,
            msg: 'Reseteo de la contraseña efectuado exitosamente'
        })
    } catch (error) {
        console.log("Error identificado:", error);
        err = error;
        res.json({
            estado: false,
            msg: "¡ERROR!, Revisa que hayas ingresado correctamente los datos"
        });
    }
}


module.exports = formControl;
