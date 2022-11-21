const router = require('express').Router();
const  { getStudents, getGrades, getAbsences, getSubjects } = require('../controllers/classesController')

router.get('/:classId/students', getStudents);
router.get('/:classId/grades', getGrades);
router.get('/:classId/absences', getAbsences);
router.get('/:classId/subjects', getSubjects);


module.exports = router;