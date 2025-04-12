import express from "express";
import * as inventoryController from "../controllers/inventory-controller.js";

const router = express.Router();
// get all the inventory for all warehouses
// usage: GET /api/inventories
router.route("/").get(inventoryController.getAllInventory);

// get all categories for inventory
// usage: GET /api/inventories/categories
router.route("/categories").get(inventoryController.getInventoryCategories);

// get item details based on ID
// usage: GET /api/inventories/:id
router.route("/:id").get(inventoryController.getItemDetailsById);


export default router;
