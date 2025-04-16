import initKnex from "knex";
import configuration from "../models/knexfile.js";
const knex = initKnex(configuration);

// get all the inventory for all warehouses
const getAllInventory = async (req, res) => {
  try {
    const response = await knex("inventories")
      .join("warehouses", "inventories.warehouse_id", "warehouses.id")
      .select("inventories.*", "warehouses.warehouse_name as warehouse_name");

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve inventory data for warehouse with ID ${req.params.id}`,
    });
  }
};

// get the inventory for a specific warehouse based on the warehouse_id from req.params.id
const getInventoryByWarehouseId = async (req, res) => {
  try {
    const response = await knex("inventories").where({
      warehouse_id: req.params.id,
    });

    if (!response) {
      res
        .status(404)
        .json({ message: `Warehouse with ID ${req.params.id} not found` });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve inventory data for warehouse with ID ${req.params.id}`,
    });
  }
};

// get the details of item based on ID
const getItemDetailsById = async (req, res) => {
  try {
    const response = await knex("inventories")
      .where("inventories.id", req.params.id)
      .join("warehouses", "inventories.warehouse_id", "warehouses.id")
      .select("inventories.*", "warehouses.warehouse_name as warehouse_name")
      .first();

    if (!response) {
      return res
        .status(404)
        .json({ message: `Item with ID ${req.params.id} not found` });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve item data with ID ${req.params.id}`,
    });
  }
};

const deleteItemById = async (req, res) => {
  try {
    const response = await knex("inventories")
      .where("inventories.id", req.params.id)
      .del();

    if (!response) {
      return res
        .status(404)
        .json({ message: `Item with ID ${req.params.id} not found` });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve item data with ID ${req.params.id}`,
    });
  }
};

export { getInventoryByWarehouseId, getItemDetailsById, getAllInventory, deleteItemById };
