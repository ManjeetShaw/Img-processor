require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const uploadRoute = require('./routes/upload');


const app = express();
app.use(express.json());

connectDB();

app.get('/health', (req,res) => res.json({ status:'ok'}));
app.use('/', uploadRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));