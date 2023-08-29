router.get('/', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = 10; // Number of threads per page

    const offset = (page - 1) * perPage;
    
    const threadsData = await Threads.findAndCountAll({
      limit: perPage,
      offset: offset,
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
      logged_in: req.session.logged_in,
      currentPage: page,
      totalPages: totalPages
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
