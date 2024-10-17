require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Album = require("./Album");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

connectDB().then(() => {
  console.log("Connected to MongoDB");
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Get all albums
app.get("/api/albums", async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get album by title
app.get("/api/albums/:title", async (req, res) => {
  const album = await Album.find({ title: req.params.title });
  if (album.length === 0)
    return res.status(404).json({ message: "Album not found" });
  res.status(200).json(album);
});

// Create a new album
app.post("/api/albums", async (req, res) => {
  const { title, artist, year } = req.body;

  const newAlbum = await Album.create({
    title,
    artist,
    year,
  });

  res.status(201).json(newAlbum);
});

// Update an album by ID
app.put("/api/albums/:id", async (req, res) => {
  const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedAlbum)
    return res.status(404).json({ message: "Album not found" });
  res.status(200).json(updatedAlbum);
});

// Delete an album by ID
app.delete("/api/albums/:id", async (req, res) => {
  const album = await Album.findById(req.params.id);
  if (!album) return res.status(404).json({ message: "Album not found" });

  await Album.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Album deleted successfully" });
});

app.get("/api/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});
