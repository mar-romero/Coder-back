import { Router } from "express";
import cartsController from "../controllers/cartsController.js";

const router = Router();

router.get('/:cid/products', cartsController.getProducts);

router.post('/', cartsController.createCart);

router.post('/:cid/products', cartsController.addProduct);

router.delete('/:cid', cartsController.deleteCart);

router.delete('/:cid/products/:pid', cartsController.deleteProduct);

export default router;