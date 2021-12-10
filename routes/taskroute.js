const {Router}= require ('express');
const router = Router();
const {postForm} = require('../controllers/Post');
 const {getForm} = require('../controllers/Get');

//rutas  para cada tarea
router.post('/login',getForm);
router.route('/registro')
    //.get(getForm)
    .post(postForm);
    
module.exports = router;

