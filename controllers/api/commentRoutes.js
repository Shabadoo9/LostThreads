const router = require('express').Router();
const { Comments, User, Threads } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
      const comments = await Comments.findAll({
     
      });
  
      res.status(200).json({ comments });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comments.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      // Query comments associated with the thread after creating the new comment
      const updatedComments = await Comments.findAll({
        where: {
          thread_id: req.body.thread_id,
        },
      });
  
      res.status(201).json({ comments: updatedComments });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comments.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;