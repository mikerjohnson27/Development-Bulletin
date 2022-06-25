const router = require('express').Router();

const userRoutes = require('./api');
const homeRoutes = require('./homeRoutes');


router.use('/', homeRoutes);
router.use('/users', userRoutes);


module.exports = router;