const {Router}= require ('express');
const router = Router();
const {postForm} = require('../controllers/Post');
const {getForm} = require('../controllers/Get');
const {viewForm}= require('../controllers/View');
const pool = require('../src/db');

//rutas  para cada tarea
router.post('/login',getForm);
//eliminación de registro de usuario tomando cuenta el id.
router.get('/delete/:id',async(req,res)=>{
        const {id} =  req.params;
        await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
        res.end();
});

// editar un registro primero muestra la información a actulizar por medio de su Id
router.get('/dataedit/:id',async(req,res)=>{
        const {id} =  req.params;
        const reSql= await pool.query('SELECT * FROM usuarios WHERE id=?',[id]);
        res.json({reSql:reSql[0]});
        //res.end();
});

router.post('/edit/:id', async(req,res)=>{
        const {id} =  req.params;
        const {email,password,rol} =req.body;
        const editvalues =
        {
              email,
              password,
              rol  
        };
        await pool.query('UPDATE usuarios set ? WHERE id =?',[editvalues,id])
       const link= `/edit/${id} `;
       console.log(link);
       res.redirect('/api/cotizador/registro');

       
       

} )

router.route('/registro')
        .post(postForm)
        .get(viewForm);
    
module.exports = router;

