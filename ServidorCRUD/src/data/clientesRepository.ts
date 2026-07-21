import { readFile, writeFile } from "fs/promises";
import { Cliente } from "../models/cliente";

export class ClienteRepository{

    private ruta="./src/data/clientes.json";

    async obtenerClientes():Promise<Cliente[]>{

        try{

            const datos=await readFile(this.ruta,"utf-8");

            return JSON.parse(datos);

        }catch(error){

            console.log("Error al leer el archivo");

            return [];

        }

    }

    async guardarClientes(clientes:Cliente[]):Promise<void>{

        try{

            await writeFile(
                this.ruta,
                JSON.stringify(clientes,null,4)
            );

        }catch(error){

            console.log("Error al guardar");

        }

    }

}