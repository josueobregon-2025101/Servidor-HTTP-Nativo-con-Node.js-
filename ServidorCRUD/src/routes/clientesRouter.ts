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
        else if(method === "GET" && url.startsWith("/clientes/")){

            const id = Number(url.split("/")[2]);
            const cliente = await service.buscar(id);
            if(!cliente === true){
                res.writeHead(404);
                res.end(JSON.stringify({mensaje:"cliente no encontrado"}));
                return true;
            }else
            res.writeHead(200);
            res.end(JSON.stringify(cliente));
            return true;
        }
        //DELETE
        else if(method ==="DELETE" && url.startsWith("/clientes/")){
            const id = Number(url.split("/")[2]);
            const cliente = await service.eliminar(id);
            if(!cliente === true){
                res.writeHead(404);
                res.end(JSON.stringify({mensaje:"cliente no encontrado"}));
                return true;
            }else
            res.writeHead(200);
            res.end(JSON.stringify({mensaje:"cliente eliminado"}));
            return true;
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