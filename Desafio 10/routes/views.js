import { Router } from "express";
import viewsController from "../controllers/viewsController.js"

const router = Router();

router.get("/", viewsController.renderForm);
router.get("/products", viewsController.renderAllProducts);
router.get("/products/:id", viewsController.renderSingleProduct);

export default router;