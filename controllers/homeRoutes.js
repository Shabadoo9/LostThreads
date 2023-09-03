router.get('/', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/home');
    return;
  }

  res.render('login');
});


router.get('/home', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const threadsData = await Threads.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const totalPages = Math.ceil(threadsData.count / perPage);

    const threads = threadsData.rows.map((threads) => threads.get({ plain: true }));

    res.render('homepage', { 
      threads, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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
