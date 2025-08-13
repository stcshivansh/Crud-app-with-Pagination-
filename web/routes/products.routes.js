import { createProduct, deleteProduct, getProducts, updateProduct,deleteMetafield,updateMeta,updateSku } from "../controller/product.controller.js";
import express from "express";
const router = express.Router();

router.get("/getAllProducts",getProducts);
router.post("/createProduct",createProduct);
router.delete("/deleteProduct",deleteProduct);
router.patch("/updateProduct", updateProduct);
router.delete("/deleteMetaField", deleteMetafield);
router.patch("/updateMetaField", updateMeta);
router.patch("/updateSkuField", updateSku);

export default router