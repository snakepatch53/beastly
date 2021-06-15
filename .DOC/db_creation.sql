DROP DATABASE beastly;

CREATE DATABASE beastly;

USE beastly;

CREATE TABLE informacion (
    informacion_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    informacion_nombre VARCHAR(50),
    informacion_sigla VARCHAR(50),
    informacion_logo VARCHAR(10),
    informacion_icon VARCHAR(10),
    informacion_ciudad VARCHAR(50),
    informacion_direccion TEXT,
    informacion_telefono VARCHAR(11),
    informacion_celular VARCHAR(11),
    informacion_email VARCHAR(50),
    informacion_iva DOUBLE,
    informacion_primary_background VARCHAR(50),
    informacion_primary_background_hover VARCHAR(50),
    informacion_primary_color VARCHAR(50),
    informacion_primary_color_hover VARCHAR(50),
    informacion_secondary_background VARCHAR(50),
    informacion_secondary_background_hover VARCHAR(50),
    informacion_secondary_color VARCHAR(50),
    informacion_secondary_color_hover VARCHAR(50),
    informacion_tertiary_background VARCHAR(50),
    informacion_tertiary_background_hover VARCHAR(50),
    informacion_tertiary_color VARCHAR(50),
    informacion_tertiary_color_hover VARCHAR(50),
    informacion_success VARCHAR(50),
    informacion_info VARCHAR(50),
    informacion_warnning VARCHAR(50),
    informacion_error VARCHAR(50)
) ENGINE INNODB;

CREATE TABLE privilegio (
    privilegio_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    privilegio_nombre VARCHAR(50)
) ENGINE INNODB;

CREATE TABLE usuario (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    usuario_nombre VARCHAR(50),
    usuario_user VARCHAR(50),
    usuario_pass VARCHAR(50),
    usuario_foto VARCHAR(100),
    usuario_createat VARCHAR(20),
    privilegio_id INT,
    FOREIGN KEY (privilegio_id) REFERENCES privilegio (privilegio_id)
) ENGINE INNODB;

CREATE TABLE cliente (
    cliente_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    cliente_foto VARCHAR(100),
    cliente_nombre1 VARCHAR(50),
    cliente_nombre2 VARCHAR(50),
    cliente_apellido1 VARCHAR(50),
    cliente_apellido2 VARCHAR(50),
    cliente_nacimiento VARCHAR(15),
    cliente_ticket BOOLEAN,
    cliente_calle1 VARCHAR(50),
    cliente_calle2 VARCHAR(50),
    cliente_ciudad VARCHAR(50),
    cliente_estado VARCHAR(50),
    cliente_postal VARCHAR(50),
    cliente_ojos_color VARCHAR(50),
    cliente_ojos_problema VARCHAR(50),
    cliente_estatura VARCHAR(50),
    cliente_cita_lugar VARCHAR(50),
    cliente_cita_hora VARCHAR(50),
    cliente_pass VARCHAR(50),
    cliente_createat VARCHAR(20)
) ENGINE INNODB;
