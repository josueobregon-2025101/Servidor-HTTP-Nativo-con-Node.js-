import { Producto } from "../models/producto";
import { ProductoRepository } from "../data/productosRepository";

export class ProductoService{
    private repository = new ProductoRepository();

    async listar():Promise<Producto[]>{
        return await this.repository.obtenerProductos();

    }

    async agregarProducto(producto:Producto):Promise<void>{
        try {
            const productosData = await this.repository.obtenerProductos();
            productosData.push(producto);
            await this.repository.guardarProductos(productosData);
            console.log("Producto agregado correctamente");
        } catch (error) {
            console.log("Ocurrio un error al intentar agregar un cilente");
            
        }
    }

    async buscar(id:number):Promise<Producto|undefined>{
        try {
            const  clientesData = await this.repository.obtenerProductos();
            const cliente = clientesData.find(u => u.id === id);
            if(!cliente){
                throw new Error("Cliente no encontrado");
            }
            return cliente;
        } catch (error) {
            throw error;
        }
    }

    async actualizarProducto(producto:Producto):Promise<boolean>{
        try {
            const productoData = await this.repository.obtenerProductos();
            const indice = productoData.findIndex(u=>u.id===producto.id);
            if(indice===-1){
                return false;
            }
            productoData[indice] = producto;
            await this.repository.guardarProductos(productoData);
            return true;
        } catch (error) {
            return false;
        }
    }

    async eliminar(id:number):Promise<boolean>{
        try {
            const productosData = await this.repository.obtenerProductos();
            const nuevoC = productosData.filter(u=>u.id!==id);
            if(productosData.length == nuevoC.length)return false;
            await this.repository.guardarProductos(nuevoC);
            return true;
        } catch (error) {
            return false;
            
        }
    }
}