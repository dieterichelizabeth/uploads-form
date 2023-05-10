// Imports
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

// App setup
const app = express();
const PORT = process.env.PORT || 3001;

// App Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Uploads Route
app.post("/api/uploads", (req, res) => {
  // Check that there is a file to upload
  if (req.files === null) {
    return res.status(400).json({ message: "No file submitted for upload!" });
  }

  const file = req.files.file;
  const folderPath = path.join(__dirname, "uploads", file.name);

  // Add the file to the uploads folder
  file.mv(`${folderPath}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.status(200).json({ message: "File succesfully uploaded!" });
  });
});

app.listen(PORT, () => console.log("Now listening"));
