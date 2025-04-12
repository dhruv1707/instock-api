import express from "express";
import * as warehouseController from "../controllers/warehouses-controller.js";
import { getInventoryByWarehouseId } from "../controllers/inventory-controller.js";

const router = express.Router();

router.route("/")
  // get all the warehouses
  // usage: GET /api/warehouses
  .get(warehouseController.allWarehouses) 
  // add a new warehouse
  // usage: POST /api/warehouses
  .post(warehouseController.add);

router.route("/:id/inventories") 
  // get all the inventories for a specific warehouse
  // usage: GET /api/warehouses/:id/inventories
  .get(getInventoryByWarehouseId); 

router.route("/:id")
  // get the details of a warehouse based on ID
  // usage: GET /api/warehouses/:id
  .get(warehouseController.findOne)
  // update the details of a warehouse based on ID
  // usage: PATCH /api/warehouses/:id
  .patch(warehouseController.updateRecord)
  // delete a warehouse based on ID
  // usage: DELETE /api/warehouses/:id
  .delete(warehouseController.deleteRecord)

export default router;
