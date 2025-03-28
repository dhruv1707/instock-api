import express from "express";
import db from "../models/knexfile.js";

const router = express.Router();

router.patch('/:id', async (req, res) => {
    const {id} = req.params;
    console.log('Request body', req.body, req.params);
    const {warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email} = req.body;
    if (warehouse_name && address && city && country && contact_name && contact_position && contact_phone && contact_email) {
        try {
            const response = await db("warehouses").where("id", id);
            const warehouseId = response[0].id
        console.log('Wraehoue id', warehouseId);
            const phoneRegex = /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            console.log("Checking for validity of phone numbers");
            if (phoneRegex.test(contact_phone) && emailRegex.test(contact_email)){
                console.log('Updating record');
                await db("warehouses").where("id", "=", warehouseId).update({
                    warehouse_name: warehouse_name,
                    address: address,
                    city: city,
                    country: country,
                    contact_name: contact_name,
                    contact_email: contact_email,
                    contact_position: contact_position,
                    contact_phone: contact_phone,
                });
                const updatedRecord = await db("warehouses").where("id", warehouseId);
                res.json(updatedRecord[0]);
            }
            else{
                console.log("Invalid phone number or email");
                res.status(400).send({message: "Invalid phone number or email"});
            }
        } catch (error) {
            return res.status(404).send({message: "Invalid id"});
        }
    }
    else {
        console.log("One or more fields are missing");
        res.status(400).send({message: 'One or more fields are missing'});
    }
})

router.delete('/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const response = await db("warehouses").where("id", id);
        const warehouseId = response[0].id;
        await db("warehouses").where("id", warehouseId).del();
        res.status(204).send({message: "No content"});
    } catch(error){
        res.status(404).send({message: "Invalid id"});
    }
})

export default router;