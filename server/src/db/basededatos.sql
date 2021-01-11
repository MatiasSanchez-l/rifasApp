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
    telefono INT NOT NULL,
    contrasenia VARCHAR ( 50 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS compra(
    compra_id SERIAL PRIMARY KEY,
    monto INT NOT NULL,
    cantidad INT NOT NULL,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS rifa(
    rifa_id SERIAL PRIMARY KEY,
    disponible BOOLEAN NOT NULL,
    cliente_id INT,
    compra_id INT,
    FOREIGN KEY (cliente_id)
    REFERENCES cliente(cliente_id),
    FOREIGN KEY (compra_id)
    REFERENCES compra(compra_id)
);

INSERT INTO usuario(nombre_usuario, contrasenia)
VALUES('admin', 'admin');

SELECT * FROM usuario;
SELECT * FROM rifa;