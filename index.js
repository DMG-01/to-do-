const express = require("express");
const connectDb = require("./connectDb");
require("dotenv").config();
const cors = require("cors");
const todoRouter = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());


app.use("/todo", todoRouter);


app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});




const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to connect to MongoDB:", error.message);
    process.exit(1); // 
  }
};

startServer();
