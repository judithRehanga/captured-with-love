const express = require("express");
const multer = require("multer");
const {
  uploadToDrive,
  getOrCreateFolder,
} = require("../services/driveService");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/", upload.array("files", 20), async (req, res) => {
  try {
    const event = req.body.event;

    console.log("Uploading to event:", event);

    const folderId = await getOrCreateFolder(event);

    await Promise.all(req.files.map((file) => uploadToDrive(file, folderId)));

    res.json({
      success: true,
      message: "Files uploaded successfully!",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
});

module.exports = router;
