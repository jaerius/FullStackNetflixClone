const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies")
const listRoute = require("./routes/lists")


dotenv.config();

const app = express();

// Mongoose connection without the deprecated options
mongoose.connect(process.env.MONGO_URL, {
    connectTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000
})
.then(() => {
    console.log("Connected to MongoDB via Mongoose");

    // Middleware
    app.use(express.json());
    app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/api/movies", movieRoute);
    app.use("/api/lists", listRoute);

    // Start the Express server
    app.listen(8800, () => {
        console.log("Backend server is running");
    });
})
.catch(err => {
    console.error("MongoDB connection error:", err);
});