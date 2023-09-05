const router = require('express').Router();
const { User, Threads } = require('../../models');
const withAuth = require('../../utils/auth');

// Your existing route for creating a new thread
router.post('/', withAuth, async (req, res) => {
  try {
    const newThread = await Threads.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    
    res.render('homepage');
  } catch (err) {
    res.status(400).json(err);
  }
});

// Your existing route for deleting a thread
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const threadData = await Threads.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!threadData) {
      res.status(404).json({ message: 'No thread found with this id!' });
      return;
    }

    res.status(200).json(threadData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// New route for fetching threads belonging to the logged-in user
router.get('/my-threads', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;

    const userThreads = await Threads.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    res.render('your_template', { threads: userThreads });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
