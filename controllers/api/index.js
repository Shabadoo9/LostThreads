const express = require('express');
const router = express.Router();

const profileAndThreadRouter = require('./profileAndThreadBuilder');
const threadsRouter = require('./threadsRoutes');
const userRouter = require('./userRoutes');

router.use('/profile-thread', profileAndThreadRouter);
router.use('/threads', threadsRouter);
router.use('/users', userRouter);

module.exports = router;