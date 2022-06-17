const router = require('express').Router();
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');
const deleteRoutes = require('./deleteRoutes');

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/delete', deleteRoutes);

module.exports = router;