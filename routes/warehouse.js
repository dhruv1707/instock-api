import express from "express";
import * as warehouseController from "../controllers/warehouses-controller.js";

const router = express.Router();

router.route("/")
  .get(warehouseController.allWarehouses)
  .post(warehouseController.add);

router.route("/:id")
  .get(warehouseController.findOne)
  .patch(warehouseController.updateRecord)
  .delete(warehouseController.deleteRecord)

export default router;
