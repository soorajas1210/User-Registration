const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require("./routes/userRoutes");
const dotenv = require('dotenv');
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');
const app = express();
dotenv.config();



app.use(cors());
connectDB();
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("API is running...")
})


app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server Running in on port ${process.env.PORT}`
  )
);