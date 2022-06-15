CREATE DATABASE bancosolar;

\c bancosolar

CREATE TABLE usuarios (

id SERIAL PRIMARY KEY,
nombre VARCHAR(50),
balance FLOAT CHECK (balance >= 0));


CREATE TABLE transferencias (

id SERIAL PRIMARY KEY,
emisor INT,
receptor INT,
monto FLOAT,
fecha TIMESTAMP,
FOREIGN KEY (emisor) REFERENCES usuarios(id),
FOREIGN KEY (receptor) REFERENCES usuarios(id));

SELECT * FROM usuarios;

SELECT * FROM transferencias;

INSERT INTO usuarios (nombre, balance) VALUES ('luis', 13000);
INSERT INTO usuarios (nombre, balance) VALUES ('andres', 5000);
INSERT INTO usuarios (nombre, balance) VALUES ('gabriel', 100000);


INSERT INTO transferencias (emisor, receptor,monto) VALUES (1,2,1000);
INSERT INTO transferencias (emisor, receptor,monto, fecha) VALUES (1,2,1000, NOW());
