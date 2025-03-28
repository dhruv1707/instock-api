import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import warehouseRouter from "./routes/warehouse.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/warehouses", warehouseRouter);

app.listen(8000, () => {
    console.log('Server listening on port 8000');
})
