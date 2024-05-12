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
// first argument should be the name of the collection in mongoDB
export const accountModel = mongoose.model("accounts", accountSchme);