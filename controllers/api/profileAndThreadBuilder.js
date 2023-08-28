const express = require('express');
const multer = require('multer');
const path = require('path');
const { User, Threads } = require('../../models'); // Import User and Threads models

const router = express.Router();

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    const uniqueFilename = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});
// Initialize Multer middleware
const upload = multer({ storage });

// Route for creating user profiles
router.post('/create-profile', upload.single('profilePicture'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      display_name: req.body.display_name,
      user_name: req.body.user_name,
      password: req.body.password,
      profile_picture: req.file.filename,
    });

    res.status(200).json({ message: 'Profile created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Route for creating posts
router.post('/create-post', upload.single('postImage'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  try {
    const newPost = await Threads.create({
      title: req.body.title,
      date_created: new Date(),
      location: req.body.location,
      description: req.body.description,
      user_name: req.body.user_name,
      user_id: req.body.user_id,
      attachment: req.file.filename,
    });

    res.status(200).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

module.exports = router;