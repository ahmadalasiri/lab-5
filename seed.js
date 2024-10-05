require("dotenv").config();
const mongoose = require("mongoose");
const Album = require("./src/models/Album");

const albums = [
  {
    title: "Abbey Road",
    artist: "The Beatles",
    year: 1969,
  },
  {
    title: "Thriller",
    artist: "Michael Jackson",
    year: 1982,
  },
  {
    title: "Dark Side of the Moon",
    artist: "Pink Floyd",
    year: 1973,
  },
  {
    title: "The Wall",
    artist: "Pink Floyd",
    year: 1979,
  },
  {
    title: "Back in Black",
    artist: "AC/DC",
    year: 1980,
  },
];

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const seedAlbums = async () => {
  try {
    await connectDB();
    await Album.deleteMany({}); // Clear the albums collection
    await Album.insertMany(albums); // Insert the seed albums
    console.log("Albums added successfully");
    mongoose.connection.close(); // Close the connection after seeding
  } catch (error) {
    console.error("Error adding albums: ", error);
    mongoose.connection.close(); // Ensure the connection is closed in case of an error
  }
};

seedAlbums();
