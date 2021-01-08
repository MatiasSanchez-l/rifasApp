/*DROP DATABASE rifas;
CREATE DATABASE rifas;*/

CREATE TABLE IF NOT EXISTS usuario(
    usuario_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contrasenia VARCHAR ( 50 ) NOT NULL,
    es_admin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS rifa(
    rifa_id SERIAL PRIMARY KEY,
    disponible BOOLEAN NOT NULL,
    usuario_id INT,
    FOREIGN KEY (usuario_id)
    REFERENCES usuario(usuario_id)
);

INSERT INTO usuario(nombre, apellido, email, contrasenia, es_admin)
VALUES('admin', 'admin', 'admin@admin.com', 'admin', FALSE);

SELECT * FROM usuario;
SELECT * FROM rifa;