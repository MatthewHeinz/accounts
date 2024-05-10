import mongoose from "mongoose";

const accountSchme = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

export const accountModel = mongoose.model("accounts", accountSchme);