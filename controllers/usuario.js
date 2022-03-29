const pool = require('../src/db');
const bcrypt = require("bcryptjs");
const formControl = {};

    formControl.postForm = async(req, res)=> {
        const {email,password,rol,estado_login}=req.body;
        let passwordHash = await bcrypt.hash(password, 10)
        const newUser={
            rol,
            email,
            password: passwordHash,
            estado_login
            };
            const Vsql = await pool.query('SELECT email FROM usuarios WHERE email = ?', [newUser.email]);
            if (  Vsql != ''){

                res.json({ 
                msg: 'Email ya registrado intente con otro',
                estado: false
            })
             }

            else{
                const sql = await pool.query('INSERT INTO usuarios set ?', [newUser]);
                
                res.json({ 
                    msg: 'Registro exitoso',
                    estado: true
                    
                });
                console.log(passwordHash)

            }
            
           
            //res.end();
        };

    formControl.viewForm = async(req, res)=> {
            const reSql= await pool.query('SELECT id_usuario , rol , email,password FROM usuarios');
            res.json({reSql:reSql});
            //res.end();
            };

    formControl.viewUsersVenta = async(req, res)=> {
        const reSql= await pool.query('SELECT id_usuario , rol , email, password FROM usuarios WHERE rol = "venta"');
        res.json({reSql:reSql});
        //res.end();
        };
    formControl.deleteForm = async(req,res)=>{
        const {id} =  req.params;
        await pool.query("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
        res.end();
           };
    formControl.editForm= async(req,res)=>{
        const {id} =  req.params;
        const {email,password,rol,estado_login} =req.body;
        const editvalues =
        {
                email,
                rol,
                estado_login  
        };
        await pool.query('UPDATE usuarios set ? WHERE id_usuario=?',[editvalues,id])
        const link= `/edit/${id} `;
        console.log(link);
        res.redirect('/api/cotizador/registro');
           };
    formControl.editPass = async(req,res)=>{
         const {id} = req.params;
         console.log(id)
         const {password,estado_login} = req.body;
         console.log("hola soy el req.body", req.body)
         const editPass ={
             password,
             estado_login
         }
         const reSql = await pool.query('UPDATE usuarios set ? WHERE id_usuario=?',[editPass,id])
         res.json({
             data:reSql,
             msg:"cambio aplicado"
         })
         console.log(reSql);
     }

       
 module.exports = formControl;
