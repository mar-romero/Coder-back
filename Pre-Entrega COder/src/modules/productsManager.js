import filesService from "../services/filesService.js";

class productsManager {
    #products;
    constructor(){
        this.#products = [];
    }
    async getAll (){
        this.#products = await filesService.read("products.json");
        return this.#products;
    }
    async getById (id){
        this.#products = await filesService.read("products.json");
        const index = this.#products.findIndex(product => product.id == id);
        if (index === -1) return { error : 'producto no encontrado' };
        const product = this.#products[index];
        return product;
    }
    async create (product){
        this.#products = await filesService.read("products.json");
        product.id = this.#products[this.#products.length-1]?.id + 1 || 1;
        product.timestamp = Date.now();
        this.#products.push(product);
        await filesService.write("products.json", this.#products);
        return {message: "producto creado con exito"};
    }
    async update (id, product){
        this.#products = await filesService.read("products.json");
        const index = this.#products.findIndex(product => product.id == id);
        if (index === -1) return { error : 'producto no encontrado' };
        product.timestamp = Date.now();
        const props = Object.entries(this.#products[index]);
        props.forEach(prop =>{
            if (!product.hasOwnProperty(prop[0])) product[prop[0]] = prop[1];
        });
        this.#products[index] = product;
        await filesService.write("products.json", this.#products);
        return {message: `producto ${id} actualizado con exito`};
    }
    async delete (id){
        this.#products = await filesService.read("products.json");
        const index = this.#products.findIndex(product => product.id == id);
        if (index === -1) return { error : 'producto no encontrado' };
        this.#products.splice(index,1);
        await filesService.write("products.json", this.#products);
        return {message: `producto ${id} eliminado`};
    }
}

export default new productsManager();