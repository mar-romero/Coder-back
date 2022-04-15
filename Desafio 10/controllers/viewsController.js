import productsManager from "../models/productsMananger.js";

const renderSingleProduct = (req, res)=>{
    const id = req.params.id;
    const {product} = productsManager.get(id);
    res.render("single", {product});
}

const renderAllProducts = (req, res)=>{
    const products = productsManager.getAll();
    res.render("allProducts", {products, empty: products.length ? false : true});
}

const renderForm = (req, res)=>{
    res.render("home", {title: "API HANDLEBARS"});
}

export default {
    renderSingleProduct,
    renderAllProducts,
    renderForm
}