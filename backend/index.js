// necessary imports
import express from "express";
import {PORT, mongodbURL} from "./config.js";
import mongoose from "mongoose";
import accountRoute from "./routes/accountsRoute.js";
import cors from "cors";

const app = express();

// middleware for parsing req.body
app.use(express.json());

// middleware for adhering tocors policy
app.use(cors());
/*app.use(cors({
    origin: 'http://localhost4000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));*/

app.use('/accounts', accountRoute);

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("Accounts using MERN stack");
});

mongoose.connect(mongodbURL)
.then(() => {
    console.log("Connected to accountsDB Database");
    app.listen(PORT, () => {
        console.log(`PORT ${PORT} is active`);
    });
})
.catch((err) => {
    console.log(err);
});