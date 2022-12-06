const router = require('express').Router();

router.use('/schools', require('./schools'));
router.use('/students', require('./students'));
router.use('/teachers', require('./teachers'));
router.use('/classes', require('./classes'));
router.use('/subjects', require('./subjects'));
router.use('/login', require('./login'));

// router.use('/', require('./general'));
// router.use('/school', require('./school'));
// router.use('/teacher', require('./teacher'));
// router.use('/student', require('./student'));


module.exports = router;