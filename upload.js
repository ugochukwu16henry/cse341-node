// Import required modules
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");

// Initialize Express app
var app = express();
app.use(bodyParser.json());

// Configure multer storage
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now());
  },
});

// Create multer upload middleware
var upload = multer({ storage: storage }).array("userPhoto", 2);

// ✅ Define your POST route here
app.post("/api/photo", function (req, res) {
  // ✅ This is where your upload() function goes
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});

// Start the server
app.listen(3000, function () {
  console.log("Working on port 3000");
});
