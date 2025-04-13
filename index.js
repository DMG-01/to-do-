const express = require("express");
const connectDb = require("./connectDb");
require("dotenv").config();
const cors = require("cors")
const todoRouter = require("./routes/todoRoutes")

const app = express();
const PORT = 3000;



app.use(express.json())
app.use(cors())
app.use("/todo",todoRouter)

const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });

  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

startServer(); // ⬅️ Start the app
