
const { response } = require('express');
const pool = require('../src/db');

exports.postPtmBom = async (req, res) => {
   
    const newPtn= req.body;
   
     const sql = await pool.query('INSERT INTO ptn_bom set ?', [newPtn]);
    res.json({
        msg: 'Partida Agregada',

        estado: true
    });
    //res.end();
}

