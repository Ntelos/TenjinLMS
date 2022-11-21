const router = require('express').Router();

router.use('/schools', require('./schools'));
router.use('/students', require('./students'));
router.use('/teachers', require('./teachers'));
router.use('/classes', require('./classes'));
router.use('/subjects', require('./subjects'));
router.use('/login', require('./login'));


module.exports = router;