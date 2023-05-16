const express = require('express');
const productsController = require('./controllers/productsController');
const singleProductController = require('./controllers/singleProductController');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
const port = 3000;

app.get('/api/items',cors(),productsController.getProducts);
app.get('/api/items/:id',cors(), singleProductController.getProduct);

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});