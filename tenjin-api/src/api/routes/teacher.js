const router = require('express').Router();
const  { authenticate, verifyRoleSet } = require('../middlewares/verifyToken');
const  { addTeacher, getTeacher, getSchools, getSubjects, getTasksOfSubject, addTaskToSubject, 
         getStudentsOfClassroom, addPointsToStudent, addGradeToStudent, getGradesOfStudents,
         addAbsenceToStudent, getAbsencesOfStudent } = require('../controllers/teacherController');

router.post('/', addTeacher);
router.get('/', authenticate, verifyRoleSet(["teacher"]), getTeacher);
router.get('/schools', authenticate, verifyRoleSet(["teacher"]), getSchools);
router.get('/subjects', authenticate, verifyRoleSet(["teacher"]), getSubjects);
router.get('/subject/tasks', authenticate, verifyRoleSet(["teacher"]), getTasksOfSubject);
router.post('/subject/task', authenticate, verifyRoleSet(["teacher"]), addTaskToSubject);
router.get('/classroom/students', authenticate, verifyRoleSet(["teacher"]), getStudentsOfClassroom);
router.post('/student/points', authenticate, verifyRoleSet(["teacher"]), addPointsToStudent);

router.get('/classroom/grades', authenticate, verifyRoleSet(["teacher"]), getGradesOfStudents);
router.post('/student/grade', authenticate, verifyRoleSet(["teacher"]), addGradeToStudent);
router.get('/classroom/absences', authenticate, verifyRoleSet(["teacher"]), getAbsencesOfStudent);
router.post('/student/absence', authenticate, verifyRoleSet(["teacher"]), addAbsenceToStudent);


module.exports = router;