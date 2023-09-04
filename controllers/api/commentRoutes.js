const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => { 
  try {
    const newComments = await Comments.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const CommentsData = await Comments.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!CommentsData) {
        res.status(404).json({ message: 'No Comments found with this id!' });
        return;
      }
  
      res.status(200).json(CommentsData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;