import express from 'express';
import bodyParser from 'body-parser';
import * as warehouseController from '../controllers/warehouses-controller.js';

const router = express.Router();
router.use(bodyParser.json());

router
  .route("/")
  .post(warehouseController.add);

router
    .route("/:id")
    .get(warehouseController.findOne)

export default router;