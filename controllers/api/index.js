const router = require('express').Router();

const loginRoute = require('./loginRoutes');
const projectRoute = require('./projectRoutes');
const userRoute = require('./userRoutes');

router.use('/login', loginRoute);
router.use('/project', projectRoute);
router.use('/user', userRoute);

module.exports = router;