/*DROP DATABASE rifas;
CREATE DATABASE rifas;*/

/* create extension if not exists "uuid-ossp";
usuario_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
contraseña (admin) encriptada = $2b$10$V7ieSdV/.Fu8MK7.8ky9gub83OB2/UDz/Hju62X.khFhUbkQS6ARe*/

CREATE TABLE IF NOT EXISTS usuario(
    usuario_id SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    contrasenia VARCHAR ( 250 ) NOT NULL
);

drop table cliente;
drop table compra;
drop table rifa;



CREATE TABLE IF NOT EXISTS cliente (
    cliente_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(50) NOT NULL
);
/*id_mercado_pago VARCHAR(255),*/
CREATE TABLE IF NOT EXISTS compra(
    compra_id SERIAL PRIMARY KEY,
    monto INT NOT NULL,
    cantidad INT NOT NULL,
    estado VARCHAR(50) NOT NULL,
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
SELECT * FROM cliente;
SELECT * FROM compra;