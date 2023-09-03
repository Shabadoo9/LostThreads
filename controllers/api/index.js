const router = require('express').Router();

const userRoutes = require('./userRoutes');
const threadsRoutes = require('./threadsRoutes');
const profileRoutes = require('./profileRoutes');
const createThreadRoutes = require('./createThreadRoutes');

router.use('/users', userRoutes);
router.use('/threads', threadsRoutes);
router.use('/create-profile', profileRoutes);
router.use('/create-thread', createThreadRoutes);

module.exports = router;
