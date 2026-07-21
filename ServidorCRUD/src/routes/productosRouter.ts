import { IncomingMessage, ServerResponse } from "http";
import { ProductoService } from "../services/productosServices";

const service = new ProductoService();

export async function productoRouter(req:IncomingMessage, res:ServerResponse):Promise<boolean>{
    res.setHeader("Content-Type","application/json");
    const url = req.url ?? "";
    const method = req.method ?? "";
    if (!url.startsWith("/productos")) {
        return false;
    }
    try {
        //GET
        if(method === "GET" && url === "/productos"){
            const producto = await service.listar();
            res.writeHead(200);
            res.end(JSON.stringify(producto));
            return true;
        }
        //Get by id
        else if(method === "GET" && url.startsWith("/productos/")){

            const id = Number(url.split("/")[2]);
            const producto = await service.buscar(id);
            if(!producto){
                res.writeHead(404);
                res.end(JSON.stringify({mensaje:"producto no encontrado"}));
                return true;
            }else
            res.writeHead(200);
            res.end(JSON.stringify(producto));
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
            res.end(JSON.stringify(cliente));
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