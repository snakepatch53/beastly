const usuarioDao = require('../dao/usuarioDao.js');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.json(await usuarioDao.select().catch(res => res));
    res.end();
});

router.get('/:usuario_id', async (req, res) => {
    res.json(await usuarioDao.selectById(req.params).catch(res => res));
    res.end();
});

router.post('/login', async (req, res) => {
    let params = req.body;
    console.log(params);
    if (!validateLogin(params)) {
        res.json(false);
        res.end();
        return;
    }
    let db_usuario = await usuarioDao.login(params).catch(res => res);
    if (!db_usuario.length || !db_usuario) {
        res.json(false);
        res.end();
        return;
    }
    const secretKey = req.app.locals.secretkey;
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: db_usuario
    }, secretKey);
    res.json(token);
    res.end();
});

router.post('/', async (req, res) => {
    let params = req.body;
    if (!existBasicData(params)) {
        res.json(false);
        res.end();
        return;
    }
    let db_query_rs = await usuarioDao.insert(params).catch(res => res);
    res.json(await usuarioDao.selectById({
        usuario_id: db_query_rs.insertId
    }).catch(res => res));
    res.end();
});

router.put('/:usuario_id', async (req, res) => {
    let params = req.body;
    params.usuario_id = req.params.usuario_id;
    params.usuario_foto = req.file !== undefined ? req.file.filename : null;
    if (!existBasicData(params)) {
        res.json(false);
        res.end();
        return;
    }
    let db_query_rs = await usuarioDao.update(params).catch(res => res);
    if (db_query_rs.affectedRows > 0) {
        res.json(params);
    } else {
        res.json(false);
    }
    res.end();
});

router.delete('/:usuario_id', async (req, res) => {
    let db_query_rs = await usuarioDao.delete(req.params).catch(res => res);
    console.log(db_query_rs);
    res.json(db_query_rs.affectedRows > 0 ? true : false);
    res.end();
});

module.exports = router;





// Validate
const existBasicData = (params) => {
    if (
        params.usuario_nombre &&
        params.usuario_user &&
        params.usuario_pass &&
        params.privilegio_id
    ) {
        return true;
    } else {
        return false;
    }
}

// Validate
const validateLogin = (params) => {
    if (
        params.usuario_user &&
        params.usuario_pass
    ) {
        return true;
    } else {
        return false;
    }
}