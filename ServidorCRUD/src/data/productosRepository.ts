import { readFile, writeFile } from "fs/promises";
import { Producto } from "../models/producto";

export class ProductoRepository{

    private ruta="./src/data/productos.json";

    async obtenerProductos():Promise<Producto[]>{

        try{

            const datos=await readFile(this.ruta,"utf-8");

            return JSON.parse(datos);

        }catch(error){

            console.log("Error al leer el archivo");

            return [];

        }

    }

    async guardarProductos(productos:Producto[]):Promise<void>{

        try{

            await writeFile(
                this.ruta,
                JSON.stringify(productos,null,4)
            );

        }catch(error){

            console.log("Error al guardar");

        }

    }

}