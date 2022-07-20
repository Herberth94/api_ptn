const pool = require('../src/db');
const bcrypt = require("bcryptjs");
const formControl = {};

formControl.postForm = async (req, res) => {
    const { email, password, usuario_id_rol, estado_login } = req.body;
    let passwordHash = await bcrypt.hash(password, 10)
    const newUser = {
        usuario_id_rol,
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
            msg: 'Error al insertar un nuevo Usuario',
            error: err
        });
    }
    //res.end();
};

formControl.viewForm = async (req, res) => {
    const reSql = await pool.query(
         "SELECT id_usuario,usuario_id_rol,rol_nombre,email,password FROM usuarios "
        +"INNER JOIN roles ON usuario_id_rol = rol_id "
        +"WHERE email != 'admin@delfos369.com' AND email != 'angelica.yanez@palotinto.com' AND email != 'rodrigoh@palotinto.com'" 
        ); 
    res.json({ reSql: reSql });
    //res.end();
};

formControl.viewForm1 = async (req, res) => {
    const reSql = await pool.query(
         "SELECT id_usuario,usuario_id_rol,rol_nombre,email,password FROM usuarios "
        +"INNER JOIN roles ON usuario_id_rol = rol_id"
        ); 
    res.json({ reSql: reSql });
    //res.end();
};

formControl.viewUsersVenta = async (req, res) => {
    const reSql = await pool.query(
          'SELECT id_usuario,usuario_id_rol,rol_nombre,email,password FROM usuarios '
        + 'INNER JOIN roles ON usuario_id_rol = rol_id '
        + 'WHERE rol_nombre = "venta"'
        );
    res.json({ reSql: reSql });
    //res.end();
};

formControl.viewUsersVentaP = async (req, res) => {
    const {proyecto_id} = req.params;
    const reSql = await pool.query(
          'SELECT usuario_id_rol,id_usuario,up_id,email FROM usuarios '
        + 'INNER JOIN usuarios_proyectos ON up_id_usuario = id_usuario '
        + 'INNER JOIN proyecto ON up_id_proyecto = proyecto_id '
        + 'INNER JOIN roles ON usuario_id_rol = rol_id '
        + 'WHERE rol_nombre = "venta" AND proyecto_id = ?',[proyecto_id]);
    res.json({ reSql: reSql });
};

formControl.deleteForm = async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM usuarios_proyectos WHERE up_id_usuario = ?", [id]);
    res.end();
};
formControl.editForm = async (req, res) => {
    const { id } = req.params;
    const { email, password, usuario_id_rol, estado_login } = req.body;
    const editvalues =
    {
        email,
        usuario_id_rol,
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
