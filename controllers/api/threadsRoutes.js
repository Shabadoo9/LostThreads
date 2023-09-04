const router = require('express').Router();
const { User, Threads } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', withAuth, async (req, res) => {
  if (req.session.logged_in) {
    res.render('createThread');
  } else {
    res.render('login');
  }
});


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

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const threadsData = await Threads.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!threadsData) {
//       res.status(404).json({ message: 'No threads found with this id!' });
//       return;
//     }

//     res.status(200).json(threadsData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
