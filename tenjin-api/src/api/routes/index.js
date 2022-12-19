const router = require('express').Router();

router.use('/', require('./general'));
router.use('/school', require('./school'));
router.use('/teacher', require('./teacher'));
router.use('/student', require('./student'));


module.exports = router;