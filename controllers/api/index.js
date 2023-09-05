const router = require('express').Router();

const userRoutes = require('./userRoutes');
const threadsRoutes = require('./threadsRoutes');
const profileRoutes = require('./profileRoutes');
const createThreadRoutes = require('./createThreadRoutes');
const commentRoutes = require('./commentRoutes');


router.use('/users', userRoutes);
router.use('/threads', threadsRoutes);
router.use('/create-profile', profileRoutes);
router.use('/create-thread', createThreadRoutes);
router.use('/comments', commentRoutes);


module.exports = router;
