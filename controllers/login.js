const pool = require('../src/db');
const formControl = {};

    formControl.getForm = async(req, res)=> {
        const {email,password}=req.body;
        const newUser={
            email,
            password
        };
        console.log(req.body);
        const reSql= await pool.query('SELECT rol , id_usuario, estado_login FROM usuarios WHERE (email =?) AND (password=?)',[newUser.email,newUser.password]);
         //console.log(reSql);
        if (Object.keys(reSql).length === 0 ){
           res.json({ 
               estado:false,
               msg:"usuario no registrado"
        });
        }
        else{
            console.log(reSql[0]);
           res.json({ 
               rol: reSql[0].rol,
               id_usuario: reSql[0].id_usuario,
               estado_login:reSql[0].estado_login
             });
        }
        
    }
       
 module.exports = formControl;
