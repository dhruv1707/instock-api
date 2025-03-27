import initKnex from 'knex';
import configuration from '../models/knexfile.js';
const knex = initKnex(configuration);

const findOne = async (req, res) => {
  try {
    const warehouseFound = await knex("warehouses")
      .where({ id: req.params.id });

    if (warehouseFound.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found` 
      });
    }

    const warehouseData = warehouseFound[0];
    res.json(warehouseData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.id}`,
    });
  }
};

const add = async (req, res) => {
    const { 
        warehouse_name, 
        address, 
        city, 
        country, 
        contact_name, 
        contact_position, 
        contact_phone, 
        contact_email 
    } = req.body;

    if (!warehouse_name || !address || !city || !country || !contact_name || !contact_position || !contact_phone || !contact_email) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const result = await knex("warehouses").insert(req.body);

        const newWarehouseID = result[0];
        const createdWarehouse = await knex("warehouses").where({ id: newWarehouseID });

        res.status(201).json(createdWarehouse);
    } catch (error) {
        res.status(500).json({
            message: `Unable to create new warehouse: ${error}`,
        });
    }
};

export { findOne, add };