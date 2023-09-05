const router = require('express').Router();
const { User, Threads } = require('../../models');
const withAuth = require('../../utils/auth');
const multer = require('multer');
const path = require('path');

// router.get('/', withAuth, async (req, res) => {
//   if (req.session.logged_in) {
//     res.render('createThread');
//   } else {
//     res.render('login');
//   }
// });


router.post('/', withAuth, async (req, res) => { 
  try {
    const newThreads = await Threads.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    
    res.render('createThread', {successMessage: 'Thread created successfully'});
    // res.status(200).json(newThreads);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const threadsData = await Threads.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!threadsData) {
      res.status(404).json({ message: 'No threads found with this id!' });
      return;
    }

    res.status(200).json(threadsData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Uploading images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

// Create a Multer instance with the defined storage
const upload = multer({ storage: storage });

router.post('/', upload.single('threads-image'), withAuth, async (req, res) => {
  try {
    const { name, category, description } = req.body;

    // Get the filename of the uploaded image (if a file was uploaded)
    const image = req.file ? req.file.filename : null;

    // Create a new thread record in your database
    const newThread = await Threads.create({ name, category, description, image });

    res.status(201).json(newThread); // Respond with the created thread
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the thread' });
  }
});






module.exports = router;
