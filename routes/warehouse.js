import express from "express";
import * as warehouseController from "../controllers/warehouses-controller.js";

const router = express.Router();

router.patch('/:id', warehouseController.updateRecord);

router.delete('/:id', warehouseController.deleteRecord);

export default router;