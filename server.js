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






        if ((req.url == "/usuarios" && req.method == "POST")) {
            //res.setHeader('Content-Type', 'application/json')   ////consulta ????
            let body = ""
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", async() => {
                const datos = Object.values(JSON.parse(body))
                const respuesta = await insertar(datos)
                res.end(JSON.stringify(respuesta));
            })
        }


        if ((req.url == "/usuarios" && req.method == "GET")) {}






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