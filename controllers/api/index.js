const router = require('express').Router();

const userRoutes = require('./userRoutes');
const threadsRoutes = require('./threadsRoutes');
const profileAndThreadRouter = require('./profileAndThreadBuilder');

router.use('/users', userRoutes);
router.use('/threads', threadsRoutes);
router.use('/profile-thread', profileAndThreadRouter);

module.exports = router;
