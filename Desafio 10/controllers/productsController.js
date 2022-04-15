import productsManager from "../models/productsMananger.js";

const getProduct = (req, res)=>{
    const id = req.params.id;
    const product = productsManager.get(id);
    res.send(product);
}

const getAllProducts = (req, res)=>{
    const products = productsManager.getAll();
    res.send(products);
}

const createProduct = (req, res)=>{
    const product = productsManager.set(req.body);
    res.send(product);
}

const updateProduct = (req, res) =>{
    const id = req.params.id;
    const message = productsManager.update(id, req.body);
    res.send(message);
}

const deleteProduct = (req, res)=>{
    const id = req.params.id;
    const message = productsManager.delete(id);
    res.send(message);
}


export default {
    getProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}