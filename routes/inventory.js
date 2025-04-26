import express from "express";
import * as inventoryController from "../controllers/inventory-controller.js";

const router = express.Router();
// get all the inventory for all warehouses
// usage: GET /api/inventories

router.route("/")
    //get all the Inventory
    //usage: GET /api/warehouses
    .get(inventoryController.getAllInventory)
    // add a new inventory
    // usage: POST /api/inventories
    .post(inventoryController.addInventoryItem)

// get item details based on ID
// usage: GET /api/inventories/:id
router.route("/:id")
    .get(inventoryController.getItemDetailsById)
    .patch (inventoryController.updateItemByID)
    .delete(inventoryController.deleteItemById);

export default router;
