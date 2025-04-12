import initKnex from "knex";
import configuration from "../models/knexfile.js";
const knex = initKnex(configuration);

// get all the inventory categories
const getInventoryCategories = async (req, res) => {
  try {
    const response = await knex("inventories")
      .pluck("category")
      .distinct("category");

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve inventory categories`,
    });
  }
};

export { getInventoryCategories };