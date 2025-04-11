import express from "express";
import * as inventoryController from "../controllers/inventory-controller.js";

const router = express.Router();

router.route("/").get(inventoryController.getAllInventory);

router.route("/:id").get(inventoryController.getItemDetailsById)

router
  .route("/:id/inventories")
  .get(inventoryController.getInventoryByWarehouseId);



export default router;
