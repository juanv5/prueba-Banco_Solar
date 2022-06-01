const { Pool } = require("pg");


const config = {
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "bancosolar",
    port: 5432,
    max: 20,
    min: 5,
    idleTimeoutMillis: 5000,
    connetionTimeoutMillis: 2000,
}
const pool = new Pool(config);

const insertar = async(datos) => {
    const consulta = {
        text: "INSERT INTO usuarios (nombre, balance) values($1, $2);",
        values: datos,
    };
}

const consultar = async(datos) => {}

const modificar = async(datos) => {}

const eliminar = async(datos) => {}

const nuevaTransferencia = async(datos) => {}

const verTransferencias = async(datos) => {}


module.exports = { insertar, consultar, modificar, eliminar, nuevaTransferencia, verTransferencias }