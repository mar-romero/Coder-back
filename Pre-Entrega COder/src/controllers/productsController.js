import login from "../services/login.js";
import productsManager from "../modules/productsManager.js";

const admMiddleware = (req, res, next)=>{
    if (login.isAdmin()) return next();
    res.status(401).send({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada` });
}

const getProducts = async (req, res)=>{
    const pid = req.params.pid;
    if (pid){
        const product = await productsManager.getById(pid);
        return res.send(product);
    }
    const products = await productsManager.getAll();
    res.send(products)
}

const createProduct = async (req, res)=>{
    const product = req.body;
    const message = await productsManager.create(product);
    res.send(message);
}

const updateProduct = async (req, res)=>{
    const pid = req.params.pid;
    const product = req.body;
    const message = await productsManager.update(pid, product);
    res.send(message);
}

const deleteProduct = async (req, res)=>{
    const pid = req.params.pid;
    const message = await productsManager.delete(pid);
    res.send(message);
}


export default {
    admMiddleware,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}