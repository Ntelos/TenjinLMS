const router = require('express').Router();
const  { addTeacher, getTeacher, getSchools, assignTeacherToSubject, getSubjects } = require('../controllers/teachersController');
const  { authenticate, verifyTeacher } = require('../middlewares/verifyToken');

router.post('/', addTeacher);
router.get('/', authenticate, verifyTeacher, getTeacher);
router.get('/schools', authenticate, verifyTeacher, getSchools);

router.post('/subjects', authenticate, verifyTeacher, assignTeacherToSubject);
router.get('/subjects', authenticate, verifyTeacher, getSubjects);


module.exports = router;