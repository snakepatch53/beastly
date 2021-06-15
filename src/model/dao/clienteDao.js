const mysql = require('./mysql.js');
const cliente = {};

cliente.select = () => {
    return mysql("SELECT * FROM cliente");
}

cliente.selectById = (params) => {
    return mysql(`
        SELECT * FROM cliente 
            WHERE cliente_id = ${ params.cliente_id }`);
}

cliente.insert = (params) => {
    return mysql(`
        INSERT INTO cliente SET
            cliente_nombre1 = '${ params.cliente_nombre1 }',
            cliente_nombre2 = '${ params.cliente_nombre2 }',
            cliente_apellido1 = '${ params.cliente_apellido1 }',
            cliente_apellido2 = '${ params.cliente_apellido2 }',
            cliente_nacimiento = '${ params.cliente_nacimiento }',
            cliente_ticket = ${ params.cliente_ticket },
            cliente_calle1 = '${ params.cliente_calle1 }',
            cliente_calle2 = '${ params.cliente_calle2 }',
            cliente_ciudad = '${ params.cliente_ciudad }',
            cliente_estado = '${ params.cliente_estado }',
            cliente_postal = '${ params.cliente_postal }',
            cliente_ojos_color = '${ params.cliente_ojos_color }',
            cliente_ojos_problema = '${ params.cliente_ojos_problema }',
            cliente_estatura = '${ params.cliente_estatura }',
            cliente_cita_lugar = '${ params.cliente_cita_lugar }',
            cliente_cita_hora = '${ params.cliente_cita_hora }',
            cliente_pass = '${ params.cliente_pass }',
            cliente_foto = '${ params.cliente_foto }'
    `);
}

cliente.update = (params) => {
    return mysql(`
        UPDATE cliente SET
            cliente_nombre1 = '${ params.cliente_nombre1 }',
            cliente_nombre2 = '${ params.cliente_nombre2 }',
            cliente_apellido1 = '${ params.cliente_apellido1 }',
            cliente_apellido2 = '${ params.cliente_apellido2 }',
            cliente_nacimiento = '${ params.cliente_nacimiento }',
            cliente_ticket = ${ params.cliente_ticket },
            cliente_calle1 = '${ params.cliente_calle1 }',
            cliente_calle2 = '${ params.cliente_calle2 }',
            cliente_ciudad = '${ params.cliente_ciudad }',
            cliente_estado = '${ params.cliente_estado }',
            cliente_postal = '${ params.cliente_postal }',
            cliente_ojos_color = '${ params.cliente_ojos_color }',
            cliente_ojos_problema = '${ params.cliente_ojos_problema }',
            cliente_estatura = '${ params.cliente_estatura }',
            cliente_cita_lugar = '${ params.cliente_cita_lugar }',
            cliente_cita_hora = '${ params.cliente_cita_hora }',
            cliente_pass = '${ params.cliente_pass }',
            cliente_foto = '${ params.cliente_foto }'
        WHERE cliente_id = ${ params.cliente_id }
    `);
}

cliente.delete = (params) => {
    return mysql(`
        DELETE FROM cliente 
            WHERE cliente_id = ${ params.cliente_id }
    `);
}

module.exports = cliente;