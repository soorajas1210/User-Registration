const express = require('express');
const connectDB = require('./config/db')
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
dotenv.config();



app.use(cors());
connectDB();

app.get('/', (req, res) => {
    res.send("API is running...")
})

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running in on port ${process.env.PORT}`
  )
);