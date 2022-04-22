import { Router } from "express";
import productsController from "../controllers/productsController.js";

const router = Router();

router.get('/:pid?', productsController.getProducts)

router.post('/', productsController.admMiddleware, productsController.createProduct)

router.put('/:pid', productsController.admMiddleware, productsController.updateProduct)

router.delete('/:pid', productsController.admMiddleware, productsController.deleteProduct)

export default router;