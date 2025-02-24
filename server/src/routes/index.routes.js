const router = require('express').Router();
const authRoutes = require('./auth.routes');
const bookRoutes = require('./book.routes');
const formatResponse = require('../utils/formatResponse');

router.use('/auth', authRoutes);
router.use('/book', bookRoutes);

router.use('*', (req, res) => {
  res.status(404).json(formatResponse(404, 'Not Found!'));
});

module.exports = router;
