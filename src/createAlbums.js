require("dotenv").config();
const mongoose = require("mongoose");
const Album = require("./Album");

const albums = [
  {
    title: "title-1",
    artist: "artist-1",
    year: 2001,
  },
  {
    title: "title-2",
    artist: "artist-2",
    year: 2002,
  },
  {
    title: "title-3",
    artist: "artist-3",
    year: 2003,
  },
  {
    title: "title-4",
    artist: "artist-4",
    year: 2004,
  },
  {
    title: "title-5",
    artist: "artist-5",
    year: 2005,
  },
];

const createAlbums = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Album.deleteMany({});
  await Album.insertMany(albums);
  console.log("Albums added successfully");
};

createAlbums();
