const pool = require('../src/db');
const bcrypt = require("bcryptjs");
const formControl = {};

formControl.getForm = async (req, res) => {
    const { email, password } = req.body;
    let passwordBody = password
    const newUser = {
        email,
        password
    };
    let err;
    try{
        const contrasenaHasheadaGuardada = await pool.query('SELECT password FROM usuarios WHERE email = ?', [newUser.email]);
        const reSql = await pool.query(
              'SELECT rol_nombre,usuario_id_rol, id_usuario, estado_login FROM usuarios ' 
            + 'INNER JOIN roles ON usuario_id_rol = rol_id '
            + 'WHERE email = ?', [newUser.email]);
        const contrasenaHashDestructurada = contrasenaHasheadaGuardada[0].password
        let compare = await bcrypt.compare(passwordBody, contrasenaHashDestructurada, function (err, resX) {
            if (resX == true) {
                res.json({
                    rol_nombre: reSql[0].rol_nombre,
                    id_usuario: reSql[0].id_usuario,
                    estado_login: reSql[0].estado_login,
                    msg: "Inicio de sesión exitoso"
                });
    
            } else {
                res.json({
                    estado: false,
                    msg: "Contraseña incorrecta. Por favor verifique que sus datos sean correctos e inténtelo de nuevo"
                });
    
            }
        })
    } catch(error){
        console.log("Error identificado:", error);
        err = error;

        res.json({
            msg: 'Usuario no registrado. Por favor verifique que sus datos sean correctos e inténtelo de nuevo',
            error: err
        });
    }



}

module.exports = formControl;
