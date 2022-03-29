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
    const contrasenaHasheadaGuardada = await pool.query('SELECT password FROM usuarios WHERE email = ?', [newUser.email]);
    const reSql = await pool.query('SELECT rol , id_usuario, estado_login FROM usuarios WHERE email = ?', [newUser.email]);
    const contrasenaHashDestructurada = contrasenaHasheadaGuardada[0].password
    let compare = await bcrypt.compare(passwordBody, contrasenaHashDestructurada, function (err, resX) {
        if (resX == true) {
            res.json({
                rol: reSql[0].rol,
                id_usuario: reSql[0].id_usuario,
                estado_login: reSql[0].estado_login,
                msg: "Usuario validado"
            });

        } else {
            res.json({
                estado: false,
                msg: "Usuario no registrado"
            });

        }
    })


}

module.exports = formControl;
