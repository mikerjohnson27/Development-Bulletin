const router = require('express').Router();

const loginRoute = require('./loginRoutes');
const projectRoute = require('./projectRoutes');
const taskRoute = require('./taskRoutes');

router.use('/login', loginRoute);
router.use('/project', projectRoute);
router.use('/task', taskRoute);

module.exports = router;