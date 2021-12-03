const { response } = require('express');
const formControl = {};

    formControl.postForm = async(req, res)=> {

       res.json({ msg: 'pruba post' });
        console.log('prueba de enlace');
    }
       
 module.exports = formControl;
