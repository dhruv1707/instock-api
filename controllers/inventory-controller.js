import initKnex from "knex";
import configuration from "../models/knexfile.js";
const knex = initKnex(configuration);

// get the inventory for a specific warehouse based on the warehouse_id from req.params.id
const getInventoryByWarehouseId = async (req, res) => {
    try {
        const response = await knex("inventories").where({ warehouse_id: req.params.id});

        if (!response) {
            res.status(404).json({ message: `Warehouse with ID ${req.params.id} not found` })
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve inventory data for warehouse with ID ${req.params.id}`,
          });
    }
}

export { getInventoryByWarehouseId }