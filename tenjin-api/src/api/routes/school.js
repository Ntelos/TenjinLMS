const router = require('express').Router();
const  { authenticate, verifyRoleSet } = require('../middlewares/verifyToken');
const  { addSchool, getSchool, getStudents, 
         enrollStudent, getTeachers, employTeacher, 
         getClassrooms, addClassroom, getStudentsOfClassroom, 
         assignStudentToClassroom, getGradesOfStudent, 
         getAbsencesOfStudent, getSubjects, assignTeaching } = require('../controllers/schoolController');

router.post('/', addSchool);
router.get('/', authenticate, verifyRoleSet(["school"]), getSchool);

router.get('/students', authenticate, verifyRoleSet(["school"]), getStudents);
router.post('/student', authenticate, verifyRoleSet(["school"]), enrollStudent);

router.get('teachers', authenticate, verifyRoleSet(["school"]), getTeachers);
router.post('/teacher', authenticate, verifyRoleSet(["school"]), employTeacher);

router.get('classrooms', authenticate, verifyRoleSet(["school"]), getClassrooms);
router.post('/classroom', authenticate, verifyRoleSet(["school"]), addClassroom);

router.get('classrooms/:classroomId/students', authenticate, verifyRoleSet(["school"]), getStudentsOfClassroom);
router.post('/classrooms/:classroomId/student', authenticate, verifyRoleSet(["school"]), assignStudentToClassroom);

router.get('students/:studentId/grades', authenticate, verifyRoleSet(["school"]), getGradesOfStudent);
router.get('students/:studentId/absences', authenticate, verifyRoleSet(["school"]), getAbsencesOfStudent);

router.get('subjects', authenticate, verifyRoleSet(["school"]), getSubjects);

router.post('/teachers/:teacherId/subjects/:subjectId', authenticate, verifyRoleSet(["school"]), assignTeaching);


module.exports = router;