import express from "express";
import * as warehouseController from "../controllers/warehouses-controller.js";

const router = express.Router();

router.patch('/:id', warehouseController.updateRecord);

router.delete('/:id', warehouseController.deleteRecord);

router
  .route("/")
  .post(warehouseController.add);

router
    .route("/:id")
    .get(warehouseController.findOne)

export default router;
