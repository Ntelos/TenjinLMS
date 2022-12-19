const router = require('express').Router();
const  { authenticate, verifyRoleSet } = require('../middlewares/verifyToken');
const  { addStudent, getStudent, getPoints, getClassroom, getGrades, getAbsences, getSubjects, getAssignments } = require('../controllers/studentController');

router.post('/', addStudent);
router.get('/', authenticate, verifyRoleSet(["student"]), getStudent);
router.get('/points', authenticate, verifyRoleSet(["student"]), getPoints);
router.get('/classroom', authenticate, verifyRoleSet(["student"]), getClassroom);
router.get('/grades', authenticate, verifyRoleSet(["student"]), getGrades);
router.get('/absences', authenticate, verifyRoleSet(["student"]), getAbsences);
router.get('/subjects', authenticate, verifyRoleSet(["student"]), getSubjects);
router.get('/assignments', authenticate, verifyRoleSet(["student"]), getAssignments);


module.exports = router;