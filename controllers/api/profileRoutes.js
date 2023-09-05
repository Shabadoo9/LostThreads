const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { User, Threads } = require('../../models'); // Import User and Threads models
const withAuth = require('../../utils/auth');



// // Set up storage for uploaded images
// const storage = multer.diskStorage({
//   destination: './public/uploads/',
//   filename: (req, file, cb) => {
//     const uniqueFilename = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
//     cb(null, uniqueFilename);
//   }
// });

// // Initialize Multer middleware
// const upload = multer({ storage });

// // Route for creating user profiles
// router.post('/edit-profile', upload.single('profilePicture'), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No image uploaded' });
//   }

//   try {
//     const newUser = await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       display_name: req.body.display_name,
//       user_name: req.body.user_name,
//       password: req.body.password,
//       profile_picture: req.file.filename,
//     });

//     res.status(200).json({ message: 'Profile created successfully', user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: 'An error occurred' });
//   }
// });

module.exports = router;