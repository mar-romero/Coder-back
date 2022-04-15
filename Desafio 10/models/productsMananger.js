class ProductsManager {
    #products;
    constructor(){
        this.#products = [];
    }
    getAll (){
        return this.#products;
    }
    get (id){
        const index = this.#products.findIndex(product => product.id == id);
        if (index === -1) return { error : 'producto no encontrado' };
        const product = this.#products[index];
        return {product, message: "producto encontrado"};
    }
    set (product){
        product.id = this.#products[this.#products.length-1]?.id + 1 || 1;
        product.price = parseFloat(product.price);
        this.#products.push(product);
        return {product, message: "producto cargado exitosamente"};
    }
    update (id, product){
        const index = this.#products.findIndex(product => product.id == id);
        if (index === -1) return { error : 'producto no encontrado' };
        product.id = id;
        product.price = parseFloat(product.price);
        this.#products[index] = product;
        return {message: `producto ${id} actualizado exitosamente`};
    }
    delete (id){
        const index = this.#products.findIndex(product => product.id == id);
        if (index === -1) return { error : 'producto no encontrado' };
        this.#products.splice(index,1);
        return {message: `producto ${id} fue eliminado`};
    }
}

export default new ProductsManager();