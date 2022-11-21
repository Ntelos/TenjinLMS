const router = require('express').Router();
const  { addSchool, getSchool, getStudents, addStudent, getTeachers, addTeacher, getClasses, addClass, getSubjects } = require('../controllers/schoolsController')

router.post('/', addSchool)
router.get('/:schoolId', getSchool);

router.get('/:schoolId/students', getStudents);
router.post('/:schoolId/students', addStudent);

router.get('/:schoolId/teachers', getTeachers);
router.post('/:schoolId/teachers', addTeacher);

router.get('/:schoolId/classes', getClasses);
router.post('/:schoolId/classes', addClass);

router.get('/:schoolId/subjects', getSubjects);


module.exports = router;