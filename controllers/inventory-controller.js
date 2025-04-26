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

const addInventoryItem = async (req, res) => {
  const {
    warehouse_id,
    item_name,
    description,
    category,
    status,
    quantity,
  } = req.body;

  if (
    !warehouse_id ||
    !item_name ||
    !description ||
    !category ||
    !status ||
    !quantity
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const result = await knex("inventories").insert(req.body);

    const newInventoryID = result[0];
    const createdInventory = await knex("inventories").where({
      id: newInventoryID,
    });

    console.log(req.body)
    res.status(201).json(createdInventory);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new inventory: ${error}`,
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

const updateItemByID = async (req, res) => {
  const { id } = req.params;
  console.log("Request body", req.body, req.params);
  
  const {
    warehouse_id,
    item_name,
    description,
    category,
    status,
    quantity,
  } = req.body;

  // Validate required fields
  if (
    !warehouse_id ||
    !item_name ||
    !description ||
    !category ||
    !status ||
    quantity === undefined // allow zero quantity, but not undefined/null
  ) {
    console.log("One or more fields are missing");
    return res.status(400).send({ message: "One or more fields are missing" });
  }

  // Validate quantity is a non-negative number
  if (isNaN(quantity) || quantity < 0) {
    return res.status(400).send({ message: "Invalid quantity value" });
  }

  try {
    const response = await knex("inventories").where("id", id);

    if (response.length === 0) {
      return res.status(404).send({ message: "Item not found" });
    }

    await knex("inventories").where("id", id).update({
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity,
    });

    const updatedItem = await knex("inventories").where("id", id);
    res.json(updatedItem[0]);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).send({ message: "Server error" });
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

export { getInventoryByWarehouseId, addInventoryItem, updateItemByID, getItemDetailsById, getAllInventory, deleteItemById };
