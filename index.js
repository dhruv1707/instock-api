import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import warehousesRoutes from "./routes/warehouses-routes.js";

const app = express();
const PORT = process.env.PORT || 5001;

dotenv.config();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to inStock DB");
});
app.use("/warehouses", warehousesRoutes);

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});