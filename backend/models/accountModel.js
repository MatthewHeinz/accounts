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
// mongoose, by default, looks for a lowercase plural version of the model name that you have specified in the first parameter
export const accountModel = mongoose.model("accounts", accountSchme);