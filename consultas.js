const { Pool } = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "bancosolar",
    port: 5432,
})


// creacion de la funcion insertar
const insertar = async(datos) => {
    const consulta = {
        text: `INSERT INTO usuarios(nombre, balance) values($1, $2) RETURNING *;`,
        values: datos
    }
    try {
        const result = await pool.query(consulta)

        return result.rows[0]
    } catch (error) {
        mostrarErrores(error)
        return error
    }

}

const consultar = async() => {

    try {
        const result = await pool.query('SELECT * FROM usuarios')
        return result.rows
    } catch (error) {
        mostrarErrores(error)
        return error
    }
}

const modificar = async(datos) => {
    const consulta = {
        text: `UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3 RETURNING *`,
        values: datos,

    }
    try {
        const result = await pool.query(consulta)
        return result

    } catch (error) {
        mostrarErrores(error)
        return error
    }
}

// Paso 1
const eliminar = async(id) => {
    // Paso 2
    try {
        const result = await pool.query(`DELETE FROM usuarios WHERE id ='${id}'`)
        return result
    } catch (error) {
        mostrarErrores(error)
        return error

    }
}

const realizarTransferencia = async(datos) => {
    const consultaTrans = {
        text: 'INSERT INTO transferencias(emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *',
        values: datos
    }


    const consultaEmisor = {
        text: `UPDATE usuarios SET balance = balance - $1 WHERE id = $2 RETURNING *`,
        values: datos
    }


    const consultaReceptor = {
        text: `UPDATE usuarios SET balance = balance + $1 WHERE id = $2 RETURNING *`,
        values: datos
    }


    const consultaMonto = {
        text: `UPDATE usuarios SET balance = balance + $1 WHERE id = $2 RETURNING *`,
        values: datos
    }





}



















const verTransferencias = async() => {

    const consulta = {
        text: 'SELECT * FROM transferencias',
        rowMode: 'array',
    }
    try {
        const result = await pool.query(consulta)
        return result
    } catch (error) {
        return error
    }
}

module.exports = {
    insertar,
    consultar,
    modificar,
    eliminar,
    realizarTransferencia,
    verTransferencias
}