const express = require('express');
const multer = require('multer');
const path = require('path');
const Job = require('../models/Job');

const router = express.Router();

// Configure where + how uploaded files get saved
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // save to /uploads folder
  },
  filename: (req, file, cb) => {
    // avoid filename collisions: timestamp + original name
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// POST /upload — accepts one file under field name "image"
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const job = await Job.create({
      status: 'pending',
      inputPath: req.file.path
    });

    res.status(201).json({ jobId: job._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /jobs/:id — check job status
router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;