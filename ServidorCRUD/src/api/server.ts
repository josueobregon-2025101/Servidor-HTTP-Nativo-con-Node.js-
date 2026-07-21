import { createServer } from "http";
import { productosRouter } from "../routes/productosRouter";
import { clienteRouter} from "../routes/clientesRouter";


export function iniciarServidor(){
    const servidor = createServer(async (req,res)=>{

        if (await clienteRouter(req, res)) return;
        res.writeHead(404, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            mensaje: "Ruta no encontrada"
        }));

    });
    servidor.listen(3000, ()=>{
        console.log("======================");
        console.log("Servidor iniciado");
        console.log("http://localhost:3000");
        console.log("======================");
    });
}