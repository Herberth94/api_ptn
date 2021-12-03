const {Router}= require ('express');
const router = Router();
const {postForm} = require('../controllers/Get')

router.route('/')
    //.get(postForm)
    .post(postForm);
    
module.exports = router;

