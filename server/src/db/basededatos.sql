/*DROP DATABASE rifas;
CREATE DATABASE rifas;*/

CREATE TABLE IF NOT EXISTS usuario(
    usuario_id SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    contrasenia VARCHAR ( 50 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS cliente (
    cliente_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contrasenia VARCHAR ( 50 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS rifa(
    rifa_id SERIAL PRIMARY KEY,
    disponible BOOLEAN NOT NULL,
    cliente_id INT,
    FOREIGN KEY (cliente_id)
    REFERENCES usuario(cliente_id)
);

INSERT INTO usuario(nombre_usuario, contrasenia)
VALUES('admin', 'admin');

SELECT * FROM usuario;
SELECT * FROM rifa;