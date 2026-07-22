import { Cliente } from "../models/cliente";
import { ClienteRepository } from "../data/clientesRepository";

export class ClienteService{
    private repository = new ClienteRepository();

    async listar():Promise<Cliente[]>{
        return await this.repository.obtenerClientes();

    }

    async agregarCliente(cliente:Cliente):Promise<void>{
        try {
            const existe = await this.buscar(cliente.id);

        if (existe) {
            throw new Error("El cliente ya existe");
        }
            const clientesData = await this.repository.obtenerClientes();
            clientesData.push(cliente);
            await this.repository.guardarClientes(clientesData);
            console.log("Cliente agregado correctamente");
        } catch (error) {
            console.log("Ocurrio un error al intentar agregar un cilente");
            
        }
    }

    async buscar(id:number):Promise<Cliente|null>{
        try {
            const  clientesData = await this.repository.obtenerClientes();
            const cliente = clientesData.find(u => u.id === id);
            if(!cliente){
                return null;
            }
            return cliente;
        } catch (error) {
            throw error;
        }
    }

    async actualizarCliente(cliente:Cliente):Promise<boolean>{
        try {
            const clienteData = await this.repository.obtenerClientes();
            const indice = clienteData.findIndex(u=>u.id===cliente.id);
            if(indice===-1){
                return false;
            }
            clienteData[indice] = cliente;
            await this.repository.guardarClientes(clienteData);
            return true;
        } catch (error) {
            return false;
        }
    }

    async eliminar(id:number):Promise<boolean>{
        try {
            const ClienteData = await this.repository.obtenerClientes();
            const nuevoC = ClienteData.filter(u=>u.id!==id);
            if(ClienteData.length == nuevoC.length)return false;
            await this.repository.guardarClientes(nuevoC);
            return true;
        } catch (error) {
            return false;
            
        }
    }
}