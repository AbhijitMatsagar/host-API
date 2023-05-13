require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');

const PORT = process.env.PORT || 3000;

const products_routes = require('./routes/products');

const app = express()

app.get('/', (req, res) => {
    res.send("Hello ia ma alive");
})

//middlewear of to set a server
app.use("/api/products", products_routes)

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
           console.log(`${PORT} Yes I am connected!`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()