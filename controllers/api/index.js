const router = require('express').Router();
const userRoutes = require('./userRoutes');
const threadsRoutes = require('./threadsRoutes');

router.use('/users', userRoutes);
router.use('/threads', threadsRoutes);

module.exports = router;