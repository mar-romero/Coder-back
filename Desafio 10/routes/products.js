import { Router } from "express";
import productsController from "../controllers/productsController.js";

const router = Router();

router.get("/", productsController.getAllProducts);
router.get("/:id",productsController.getProduct);
router.post("/", productsController.createProduct);
router.delete("/:id", productsController.deleteProduct);
router.put("/:id", productsController.updateProduct);

export default router;