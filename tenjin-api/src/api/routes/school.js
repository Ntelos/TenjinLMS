const router = require('express').Router();
const  { authenticate, verifyRoleSet } = require('../middlewares/verifyToken');
const  { addSchool, getSchool, getStudents, 
         enrollStudent, getTeachers, employTeacher, 
         getClassrooms, addClassroom, getStudentsOfClassroom, 
         assignStudentToClassroom, getGradesOfStudent, 
         getAbsencesOfStudent, assignTeaching, getTeachings, getUnassignedStudentsOfSchool } = require('../controllers/schoolController');

router.post('/', addSchool);
router.get('/', authenticate, verifyRoleSet(["school"]), getSchool);

router.post('/students', authenticate, verifyRoleSet(["school"]), getStudents);
router.post('/student', authenticate, verifyRoleSet(["school"]), enrollStudent);

router.post('/teachers', authenticate, verifyRoleSet(["school"]), getTeachers);
router.post('/teacher', authenticate, verifyRoleSet(["school"]), employTeacher);

router.post('/classrooms', authenticate, verifyRoleSet(["school"]), getClassrooms);
router.post('/classroom', authenticate, verifyRoleSet(["school"]), addClassroom);

router.post('/classrooms/students', authenticate, verifyRoleSet(["school"]), getStudentsOfClassroom);
router.post('/classrooms/student', authenticate, verifyRoleSet(["school"]), assignStudentToClassroom);

router.post('/students/unassigned', authenticate, verifyRoleSet(["school"]), getUnassignedStudentsOfSchool);

router.post('/students/grades', authenticate, verifyRoleSet(["school"]), getGradesOfStudent);
router.post('/students/absences', authenticate, verifyRoleSet(["school"]), getAbsencesOfStudent);

router.post('/teaching', authenticate, verifyRoleSet(["school"]), assignTeaching);
router.post('/teachings', authenticate, verifyRoleSet(["school"]), getTeachings);


module.exports = router;