import express from "express";
import * as categoryController from "../controllers/categories-controller.js";

const router = express.Router();

// get all categories for inventory
// usage: GET /api/inventories/categories
router.route("/").get(categoryController.getInventoryCategories);

export default router;
