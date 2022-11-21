const router = require('express').Router();
const  { addStudent, getStudent, addStudentToClass, getGrades, getAbsences, getPoints, addGrade, addAbsences, addPoints, getClass } = require('../controllers/studentsController')

router.post('/', addStudent)
router.get('/:studentId', getStudent);

router.patch('/:studentId/class', addStudentToClass);
router.get('/:studentId/class', getClass);

router.get('/:studentId/grades', getGrades);
router.get('/:studentId/absences', getAbsences);
router.get('/:studentId/points', getPoints);
router.post('/:studentId/grades', addGrade);
router.post('/:studentId/absences', addAbsences);
router.post('/:studentId/points', addPoints);


module.exports = router;