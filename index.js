require("dotenv").config();
const express = require("express");
const { connectDB } = require("./dbConnection");
const path = require("path");
const albumRoutes = require("./src/routes/albumRoutes");

connectDB().then(() => {
  console.log("Connected to DB");
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", albumRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
