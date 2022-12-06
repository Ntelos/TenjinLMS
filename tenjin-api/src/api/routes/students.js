const router = require('express').Router();
const  { addStudent, getStudent, addStudentToClass, getGrades, getAbsences, getPoints, addGrade, addAbsences, addPoints, getClass } = require('../controllers/studentsController');
const  { authenticate, verifyStudent } = require('../middlewares/verifyToken');

router.post('/', addStudent)
router.get('/', authenticate, verifyStudent, getStudent);

router.post('/class', authenticate, verifyStudent, addStudentToClass);
router.get('/class', authenticate, verifyStudent, getClass);

router.get('/grades', authenticate, verifyStudent, getGrades);
router.get('/absences', authenticate, verifyStudent, getAbsences);
router.get('/points', authenticate, verifyStudent, getPoints);
router.post('/grades', authenticate, verifyStudent, addGrade);
router.post('/absences', authenticate, verifyStudent, addAbsences);
router.post('/points', authenticate, verifyStudent, addPoints);


module.exports = router;