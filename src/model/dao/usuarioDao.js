const md5 = require('md5');
const mysql = require('./mysql.js');
const usuario = {};

usuario.select = () => {
    return mysql("SELECT * FROM usuario");
}

usuario.selectById = (params) => {
    return mysql(`
        SELECT * FROM usuario 
            WHERE usuario_id = ${ params.usuario_id }`);
}


usuario.login = (params) => {
    return mysql(`
        SELECT * FROM usuario 
        WHERE 
            usuario_user = '${ params.usuario_user }' AND 
            usuario_pass = '${ md5(params.usuario_pass) }'`);
}

usuario.insert = (params) => {
    return mysql(`
        INSERT INTO usuario SET
            usuario_nombre = '${ params.usuario_nombre }',
            usuario_user = '${ params.usuario_user }',
            usuario_pass = '${ md5(params.usuario_pass) }',
            usuario_createat = '${ new Date() }',
            privilegio_id = '${ params.privilegio_id }'
    `);
}

usuario.update = (params) => {
    return mysql(`
        UPDATE usuario SET
            usuario_nombre = '${ params.usuario_nombre }',
            usuario_user = '${ params.usuario_user }',
            usuario_pass = '${ params.usuario_pass }',
            privilegio_id = '${ params.privilegio_id }'
        WHERE usuario_id = ${ params.usuario_id }
    `);
}

usuario.delete = (params) => {
    return mysql(`
        DELETE FROM usuario 
            WHERE usuario_id = ${ params.usuario_id }
    `);
}

module.exports = usuario;