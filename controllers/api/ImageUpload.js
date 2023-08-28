const express = require('express');
const multer = require('multer');
const path = require('path');
const { User, Post } = require('../../models');

const router = express.Router();

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: './uploads/', // Upload directory for images
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize Multer middleware
const upload = multer({ storage });

// Route for uploading profile pictures
router.post('/upload/profile-picture', upload.single('profilePicture'), async (req, res) => {
});

// Route for uploading images for forum posts
router.post('/upload/post-image', upload.single('postImage'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  try {
    // Create a new post with the image filename as its attachment
    const newPost = await Post.create({
      content: req.body.content,
      attachment: req.file.filename,
      user_id: req.session.user_id
    });

    res.status(200).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Route to get user's profile picture filename
router.get('/user/profile-picture', async (req, res) => {
});

module.exports = router;