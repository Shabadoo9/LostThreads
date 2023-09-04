const router = require('express').Router();
const { Threads, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/home');
    return;
  }

  res.render('login');
});


router.get('/home', async (req, res) => {
  try {
    // Get all Threads and JOIN with user data
    const threadsData = await Threads.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const threads = threadsData.map((threads) => threads.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      threads, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
})



router.get('/threads/:id', async (req, res) => {
  try {
    const threadsData = await Threads.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const threads = threadsData.get({ plain: true });

    res.render('threads', {
      ...threads,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Threads }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/createThread', withAuth, async (req, res) => {
  console.log('Session logged_in:', req.session.logged_in); // Check session status
  try {
    res.render('createThread', { 
      logged_in: req.session.logged_in 
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});
  module.exports = router;
