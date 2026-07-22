import { IncomingMessage, ServerResponse } from "http";
import { ClienteService} from "../services/clientesServices"

const service = new ClienteService();

export async function clienteRouter(req:IncomingMessage, res:ServerResponse):Promise<boolean>{
    res.setHeader("Content-Type","application/json");
    const url = req.url ?? "";
    const method = req.method ?? "";
    if (!url.startsWith("/clientes")) {
        return false;
    }
    try {
        //GET
        if(method === "GET" && url === "/clientes"){
            const clientes = await service.listar();
            res.writeHead(200);
            res.end(JSON.stringify(clientes));
            return true;
        }
        //Get by id
        if(method === "GET" && url.startsWith("/clientes/")){

            const id = Number(url.split("/")[2]);
            const cliente = await service.buscar(id);
            if(!cliente){
                res.writeHead(404);
                res.end(JSON.stringify({mensaje:"cliente no encontrado"}));
                return true;
            }else
            res.writeHead(200);
            res.end(JSON.stringify(cliente));
            return true;
        }
        //POST
        if(method === "POST" && url === "/clientes"){
            let body = "";

            req.on("data",chunk =>{
                body += chunk;
            });
            req.on("end",async ()=>{
                try {
                    const cliente = JSON.parse(body);
                    await service.agregarCliente(cliente);
                    res.writeHead(201);
                    res.end(JSON.stringify({mensaje : "Cliente Creado"}));
                    return true;
                } catch (error) {
                    res.writeHead(400);
                    res.end(JSON.stringify({mensaje:(error as Error).message}));
                    return true;
                }
            });
            return true;
        }

        //PUT
        if(method === "PUT" && url.startsWith("/clientes/")){
            let body = "";
            req.on("data",chunk=>{
                body += chunk;
            });
            req.on("end",async ()=>{
                try {
                    const cliente = JSON.parse(body);
                    cliente.id = Number(url.split("/")[2]);
                    await service.actualizarCliente(cliente);
                    res.writeHead(200);
                    res.end(JSON.stringify({mensaje:"Cliente Actualizado"}));
                    return true;
                } catch (error) {
                    res.writeHead(400);
                    res.end(JSON.stringify({mensaje:(error as Error).message}));
                    return true;
                    
                }
            });
            return true;
        }

        //DELETE
        if(method ==="DELETE" && url.startsWith("/clientes/")){
            const id = Number(url.split("/")[2]);
            const cliente = await service.eliminar(id);
            if(!cliente){
                res.writeHead(404);
                res.end(JSON.stringify({mensaje:"cliente no encontrado"}));
                return true;
            }else{
                res.writeHead(200);
                res.end(JSON.stringify({mensaje:"cliente eliminado"}));
                return true;
            }
        }

        res.writeHead(404);
        res.end(JSON.stringify({
            mensaje: "Ruta no encontrada"
        }));
        return true;
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({
            mensaje: "Error interno del servidor"
        }));
        return true;
    }
}