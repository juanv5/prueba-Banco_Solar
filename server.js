const http = require("http")
const { insertar, consultar, modificar, eliminar, nuevaTransferencia, verTransferencias } = require("./consultas")
const fs = require("fs")
const url = require("url")

http
    .createServer(async(req, res) => {
        if (req.url == "/" && req.method === "GET") {
            try {
                // Paso 3
                res.setHeader("content-type", "text/html")
                    // Paso 4
                const html = fs.readFileSync("index.html", "utf8")
                res.statusCode = 200
                res.end(html)
            } catch (error) {
                console.log(error.code)
                res.statusCode = 500
                return error
            }
        }



        // metodo POST para recibir los datos de cada nuevo usuario almacenado en PostgreSQL


        if ((req.url == "/usuarios" && req.method == "POST")) {
            //res.setHeader('Content-Type', 'application/json')   ////consulta ????
            let body = ""
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", async() => {
                const datos = JSON.parse(body)
                try {
                    const respuesta = await insertar(datos)
                    res.statusCode = 201
                    res.end(JSON.stringify(respuesta));
                } catch (error) {
                    res.statusCode = 500
                    res.end("Ocurrio un problema en el servidor..." + error)
                }
            })
        }


        // metodo GET para devolver los usuarios registrados con sus balances



        if (req.url == "/usuarios" && req.method == "GET") {
            try {
                const resultado = await consultar()
                res.statusCode = 201
                res.end(JSON.stringify(resultado))
            } catch (error) {
                res.statusCode = 500
                res.end("Ocurrio un problema en el servidor..." + error)
            }
        }






        if ((req.url == "/usuarios" && req.method == "PUT")) {

            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", async() => {
                const datos = Object.values(JSON.parse(body));
                // Paso 2
                const respuesta = await editar(datos);
                res.end(JSON.stringify(respuesta));
            });
        }




        if (req.url == "/usuarios" && req.method == "DELETE") {}



        if ((req.url == "/transferencias" && req.method == "POST")) {}



        if ((req.url == "/transferencias" && req.method == "GET")) {}



    })
    .listen(3000);