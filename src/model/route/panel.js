// Dependences Externals
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// MIDDLEWARE 
const isLogued = (req, res, nest) => {
    const header = req.headers['authorization'];
    if (header) {
        jwt.verify(header, req.app.locals.secretkey, (err, data) => {
            if (err) {
                res.redirect('./login');
            } else {
                req.usuario = data;
                next();
            }
        });
    } else {
        res.redirect('./login');
    }
}

router.get('/login', (req, res) => {
    res.render('login', {
        proyect: req.app.locals.proyect,
        root_absolute: req.app.locals.proyect.getRootAbsolute(req)
    });
    res.end();
});

router.get('/inicio', isLogued, (req, res) => {
    res.send("ESTA LOGUEADO");
    // res.render('inicio', {
    //     proyect: req.app.locals.proyect,
    //     root_absolute: req.app.locals.proyect.getRootAbsolute(req)
    // });
    res.end();
});

module.exports = router;;