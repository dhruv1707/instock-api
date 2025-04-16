// add this configuration
import initKnex from "knex";
import configuration from "../models/knexfile.js";
const knex = initKnex(configuration);

// replace db with knex
const findOne = async (req, res) => {
  try {
    const warehouseFound = await knex("warehouses").where({
      id: req.params.id,
    });

    if (warehouseFound.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
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
    contact_email,
  } = req.body;

  if (
    !warehouse_name ||
    !address ||
    !city ||
    !country ||
    !contact_name ||
    !contact_position ||
    !contact_phone ||
    !contact_email
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const result = await knex("warehouses").insert(req.body);

    const newWarehouseID = result[0];
    const createdWarehouse = await knex("warehouses").where({
      id: newWarehouseID,
    });

    console.log(req.body)
    res.status(201).json(createdWarehouse);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new warehouse: ${error}`,
    });
  }
};

const updateRecord = async (req, res) => {
  const { id } = req.params;
  console.log("Request body", req.body, req.params);
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;
  if (
    warehouse_name &&
    address &&
    city &&
    country &&
    contact_name &&
    contact_position &&
    contact_phone &&
    contact_email
  ) {
    try {
      const response = await knex("warehouses").where("id", id);
      const warehouseId = response[0].id;
      console.log("Wraehoue id", warehouseId);

      const phoneRegex = /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      console.log("Checking for validity of phone numbers");
      if (phoneRegex.test(contact_phone) && emailRegex.test(contact_email)) {
        console.log("Updating record");

        await knex("warehouses").where("id", "=", warehouseId).update({
          warehouse_name: warehouse_name,
          address: address,
          city: city,
          country: country,
          contact_name: contact_name,
          contact_email: contact_email,
          contact_position: contact_position,
          contact_phone: contact_phone,
        });
        const updatedRecord = await knex("warehouses").where("id", warehouseId);
        res.json(updatedRecord[0]);
      } else {
        console.log("Invalid phone number or email");
        res.status(400).send({ message: "Invalid phone number or email" });
      }
    } catch (error) {
      return res.status(404).send({ message: "Invalid id" });
    }
  } else {
    console.log("One or more fields are missing");
    res.status(400).send({ message: "One or more fields are missing" });
  }
};

const deleteRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await knex("warehouses").where("id", id);
    const warehouseId = response[0].id;
    await knex("warehouses").where("id", warehouseId).del();
    res.status(204).send({ message: "No content" });
  } catch (error) {
    res.status(404).send({ message: "Invalid id" });
  }
};

const allWarehouses = async (req, res) => {
  try {
    // remove the select to retrieve all warehouse information
    const response = await knex("warehouses");
    res.json(response);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving stuff from DB" });
  }
};

export { findOne, add, updateRecord, deleteRecord, allWarehouses };