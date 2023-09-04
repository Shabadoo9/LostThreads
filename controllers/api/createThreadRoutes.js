//const router = require('express').Router();
//const multer = require('multer');
//const path = require('path');
//const { User, Threads } = require('../../models'); // Import User and Threads models
//const withAuth = require('../../utils/auth');



// Set up storage for uploaded images
//const storage = multer.diskStorage({
  //destination: './public/uploads/',
  //filename: (req, file, cb) => {
   // const uniqueFilename = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
   // cb(null, uniqueFilename);
 // }
//});

// Initialize Multer middleware
//const upload = multer({ storage });


//router.get('/', withAuth, async (req, res) => {
  //if (req.session.logged_in) {
 //   res.render('createThread');
 //   return;
//  }

 // res.render('login');
//});



// // Route for creating posts
// router.post('/create-thread', upload.single('postImage'), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No image uploaded' });
//   }

//   try {
//     const newThread = await Threads.create({
//       title: req.body.title,
//       date_created: new Date(),
//       location: req.body.location,
//       description: req.body.description,
//       user_name: req.body.user_name,
//       user_id: req.body.user_id,
//       attachment: req.file.filename,
//     });

//     res.status(200).json({ message: 'Thread created successfully', post: newThread });
//   } catch (error) {
//     res.status(500).json({ message: 'An error occurred' });
//   }
// });

module.exports = router;