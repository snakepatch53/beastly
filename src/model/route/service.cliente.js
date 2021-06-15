const clienteDao = require('../dao/clienteDao.js')
const express = require('express');
const router = express.Router();

const multer = require('multer');
const uploadCliente_foto = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'src/view/general.file/cliente_foto');
        },
        filename: function (req, file, cb) {
            cb(null, `${ file.fieldname }-${ Date.now()}.png`);
        }
    })
}).single('cliente_foto');


router.get('/', async (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    res.json(await clienteDao.select().catch(res => res));
    res.end();
});

router.get('/:cliente_id', async (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    res.json(await clienteDao.selectById(req.params).catch(res => res));
    res.end();
});

router.post('/', uploadCliente_foto, async (req, res) => {
    let params = req.body;
    params.cliente_foto = req.file !== undefined ? req.file.filename : null;
    if (!existBasicData(params)) {
        res.json(false);
        res.end();
        return;
    }
    let db_query_rs = await clienteDao.insert(params).catch(res => res);
    res.json(await clienteDao.selectById({
        cliente_id: db_query_rs.insertId
    }).catch(res => res));
    res.end();
});

router.put('/:cliente_id', uploadCliente_foto, async (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    let params = req.body;
    params.cliente_id = req.params.cliente_id;
    params.cliente_foto = req.file !== undefined ? req.file.filename : null;
    if (!existBasicData(params)) {
        res.json(false);
        res.end();
        return;
    }
    let db_query_rs = await clienteDao.update(params).catch(res => res);
    if (db_query_rs.affectedRows > 0) {
        res.json(params);
    } else {
        res.json(false);
    }
    res.end();
});

router.delete('/:cliente_id', async (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    let db_query_rs = await clienteDao.delete(req.params).catch(res => res);
    console.log(db_query_rs);
    res.json(db_query_rs.affectedRows > 0 ? true : false);
    res.end();
});

module.exports = router;





// Validate
const existBasicData = (params) => {
    if (params.cliente_nombre1 &&
        params.cliente_nombre2 &&
        params.cliente_apellido1 &&
        params.cliente_apellido2 &&
        params.cliente_nacimiento &&
        params.cliente_ticket &&
        params.cliente_calle1 &&
        params.cliente_calle2 &&
        params.cliente_ciudad &&
        params.cliente_estado &&
        params.cliente_postal &&
        params.cliente_ojos_color &&
        params.cliente_ojos_problema &&
        params.cliente_estatura &&
        params.cliente_cita_lugar &&
        params.cliente_cita_hora &&
        params.cliente_pass
    ) {
        return true;
    } else {
        return false;
    }
}