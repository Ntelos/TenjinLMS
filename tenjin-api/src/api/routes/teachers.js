const router = require('express').Router();
const  { addTeacher, getTeacher, getSchools, assignTeacherToSubject, getSubjects } = require('../controllers/teachersController')

router.post('/', addTeacher)
router.get('/:teacherId', getTeacher);
router.get('/:teacherId/schools', getSchools);

router.post('/:teacherId/subjects', assignTeacherToSubject);
router.get('/:teacherId/subjects', getSubjects);


module.exports = router;