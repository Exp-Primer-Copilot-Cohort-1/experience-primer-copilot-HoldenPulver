// Create web server for comments

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();

// Set up logger
app.use(morgan(":date[iso] :method :url :status :res[content-length] - :response-time ms"));

// Set up body parser
app.use(bodyParser.json());

// Set up static files
app.use(express.static(path.join(__dirname, "public")));

// Set up routes
app.use("/api", require("./routes/api"));

// Set up 404 error
app.use((req, res) => {
    res.status(404).send("404 Not Found");
});

// Set up 500 error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("500 Server Error");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});