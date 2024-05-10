import express from "express";
const router = express.Router();
import { accountModel } from "../models/accountModel.js";

// post data in database
router.post('/Register', async (req, res) => {
    try {
        if (!req.body.firstname || !req.body.lastname || !req.body.age){
            return res.status(400).send({message: "Send all fields: firstname, lastname, age",});
        }

        const newAccount = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age
        };

        const account = await accountModel.create(newAccount);
        return res.status(201).send(account);
    } catch(err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// get ALL data from database
router.get('/', async (req, res) => {
    try {
        const accounts = await accountModel.find({});

        return res.status(200).json(accounts);
    } catch(err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// get a specific datum from database
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const account = await accountModel.findById(id);

        return res.status(200).json(account);
    } catch(err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// update a datum in the database
router.put('/edit/:id', async (req, res) => {
    try {
        if (!req.body.firstname || !req.body.lastname || !req.body.age){
            return res.status(400).send({message: "Send all fields: firstname, lastname, age",});
        }

        const {id} = req.params;
        const updatedAccount = await accountModel.findByIdAndUpdate(id, req.body);

        if(!updatedAccount){
            return res.status(404).json({message: error.message});
        }

        return res.status(200).send({message: "Update Successful!"});
    } catch(err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// delete a datum in database
router.delete('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deletedAccount = await accountModel.findByIdAndDelete(id);

        if(!deletedAccount) {
            return res.status(404).json({message: "Account doesn't exist!"});
        }
        
        return res.status(200).send({message: "Delete Successful!"});
    } catch(err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

export default router;