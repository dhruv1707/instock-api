import initKnex from "knex";
import configuration from "../models/knexfile.js";
import express from "express";

const knex = initKnex(configuration);
const router = express.Router();

router.get("/:id", async (req, res) => {
    try {
        const limit = 1;
        const data = await knex("warehouses")
        .where({ id: req.params.id })
        .limit(parseInt(limit));
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving warehouses: ${err}`);
    }
});

export default router;