import cartsManager from "../modules/cartsManager.js";

const getProducts = async (req, res)=>{
    const cid = req.params.cid;
    const products = await cartsManager.getProducts(cid);
    res.send(products);
}

const createCart = async (req, res)=>{
    const cid = await cartsManager.create();
    res.json(cid);
}

const addProduct = async (req, res)=>{
    const cid = req.params.cid;
    const pid = req.body.id;
    const quantity = req.body.quantity;
    const message = await cartsManager.addProduct(cid, pid, quantity);
    res.send(message);
}

const deleteCart = async (req, res)=>{
    const cid = req.params.cid;
    const message = await cartsManager.delete(cid);
    res.send(message);
}

const deleteProduct = async (req, res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const message = await cartsManager.deleteProduct(cid, pid);
    res.send(message);
}

export default {
    getProducts,
    createCart,
    addProduct,
    deleteCart,
    deleteProduct
}