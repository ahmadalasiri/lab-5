const express = require("express");
const router = express.Router();
const Album = require("../models/Album");

// Get all albums
router.get("/albums", async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get album by title
router.get("/albums/:title", async (req, res) => {
  try {
    const album = await Album.find({ title: req.params.title });
    if (album.length === 0)
      return res.status(404).json({ message: "Album not found" });
    res.json(album);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new album
router.post("/albums", async (req, res) => {
  const { title, artist, year } = req.body;

  try {
    const albumExists = await Album.findOne({ title });
    if (albumExists)
      return res.status(409).json({ message: "Album already exists" });

    const album = new Album({ title, artist, year });
    const newAlbum = await album.save();
    res.status(201).json(newAlbum);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an album by ID
router.put("/albums/:id", async (req, res) => {
  try {
    const updatedAlbum = await Album.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAlbum)
      return res.status(404).json({ message: "Album not found" });
    res.json(updatedAlbum);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an album by ID
router.delete("/albums/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: "Album not found" });

    await album.remove();
    res.json({ message: "Album deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
