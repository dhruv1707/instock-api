import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import warehouseRouter from "./routes/warehouse.js";

// add the port to env instead
const PORT = process.env.PORT || 8080;
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/warehouses", warehouseRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
