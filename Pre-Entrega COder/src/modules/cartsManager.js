import filesService from "../services/filesService.js";
import productsManager from "./productsManager.js";

class cartsManager {
    #carts;
    constructor(){
        this.#carts = [];
    }
    async getProducts (id){
        this.#carts = await filesService.read("carts.json");
        const index = this.#carts.findIndex(cart => cart.id == id);
        if (index === -1) return { error : 'carrito no encontrado' };
        const cart = this.#carts[index];
        return cart.products;
    }
    async create (){
        this.#carts = await filesService.read("carts.json");
        const cart = {};
        cart.id = this.#carts[this.#carts.length-1]?.id + 1 || 1;
        cart.timestamp = Date.now();
        cart.products = [];
        this.#carts.push(cart);
        await filesService.write("carts.json", this.#carts);
        return cart.id;
    }
    async addProduct (cid, pid, quantity = 1){
        this.#carts = await filesService.read("carts.json");
        const index = this.#carts.findIndex(cart => cart.id == cid);
        if (index === -1) return { error : 'carrito no encontrado' };
        const product = await productsManager.getById(pid);
        if (product.id != pid) return { error : 'producto inexistente' };
        if (product.stock < quantity) return { error : 'stock insuficiente' };
        let isInCart = false;
        const products = this.#carts[index].products.map(prod => {
            if (prod.id == pid){
                isInCart = true;
                prod.quantity += quantity;
            }
            return prod;
        });
        this.#carts[index].products = products;
        !isInCart && this.#carts[index].products.push({id: pid, quantity});
        await filesService.write("carts.json", this.#carts);
        //Momentaneamente modifico stock de productos al agregar al carrito. Pero luego deberia modificarse recien cuando el pedido es confirmado.
        product.stock -= quantity;
        productsManager.update(pid, product);
        //
        return {message: `producto ${pid} (x${quantity}) agregado al carrito ${cid} con exito`};
    }
    async deleteProduct (cid, pid){
        this.#carts = await filesService.read("carts.json");
        const cIndex = this.#carts.findIndex(cart => cart.id == cid);
        if (cIndex === -1) return { error : 'carrito no encontrado' };
        const pIndex = this.#carts[cIndex].products.findIndex(prod => prod.id == pid);
        if (pIndex === -1) return { error : 'producto no encontrado en el carrito' };
        const product = await productsManager.getById(pid);
        //Momentaneamente modifico stock de productos tambien al eliminar del carrito. Pero luego deberia modificarse recien cuando el pedido es cancelado.
        const quantity = this.#carts[cIndex].products[pIndex].quantity;
        product.stock += quantity;
        productsManager.update(pid, product);
        //
        this.#carts[cIndex].products.splice(pIndex,1);
        await filesService.write("carts.json", this.#carts);
        return {message: `producto ${pid} eliminado del carrito ${cid}`};
    }
    async delete (cid){
        this.#carts = await filesService.read("carts.json");
        const cIndex = this.#carts.findIndex(cart => cart.id == cid);
        if (cIndex === -1) return { error : 'carrito no encontrado' };
        for (const prod of this.#carts[cIndex].products) {
            //Momentaneamente modifico stock de productos tambien al eliminar del carrito. Pero luego deberia modificarse recien cuando el pedido es cancelado.
            const product = await productsManager.getById(prod.id);
            const quantity = prod.quantity;
            product.stock += quantity;
            await productsManager.update(prod.id, product);
            //
        }
        this.#carts.splice(cIndex,1);
        await filesService.write("carts.json", this.#carts);
        return {message: `carrito ${cid} eliminado correctamente`};
    }
}

export default new cartsManager();