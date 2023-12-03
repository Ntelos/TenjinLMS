const router = require('express').Router();
const  { authenticate, verifyRoleSet } = require('../middlewares/verifyToken');
const  { addStudent, getStudent, getPoints, getClassroom, getGrades, getAbsences, getSubjects, getTasks } = require('../controllers/studentController');

router.post('/', addStudent);
router.get('/', authenticate, verifyRoleSet(["student"]), getStudent);
router.get('/points', authenticate, verifyRoleSet(["student"]), getPoints);
router.get('/classroom', authenticate, verifyRoleSet(["student"]), getClassroom);
router.post('/grades', authenticate, verifyRoleSet(["student"]), getGrades);
router.post('/absences', authenticate, verifyRoleSet(["student"]), getAbsences);
router.post('/subjects', authenticate, verifyRoleSet(["student"]), getSubjects);
router.post('/subject/tasks', authenticate, verifyRoleSet(["student"]), getTasks);


module.exports = router;