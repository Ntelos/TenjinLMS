const router = require('express').Router();
const  { addSchool, getSchool, getStudents, addStudent, getTeachers, addTeacher, getClasses, addClass, getSubjects } = require('../controllers/schoolsController');
const  { authenticate, verifyRoleSet } = require('../middlewares/verifyToken');

router.post('/', addSchool);
router.get('/profile', authenticate, verifyRoleSet(["school"]), getSchool);

router.get('/students', authenticate, verifyRoleSet(["school"]), getStudents);
router.post('/students', authenticate, verifyRoleSet(["school"]), addStudent);

router.get('/teachers', authenticate, verifyRoleSet(["school"]), getTeachers);
router.post('/teachers', authenticate, verifyRoleSet(["school"]), addTeacher);

router.get('/classes', authenticate, verifyRoleSet(["school"]), getClasses);
router.post('/classes', authenticate, verifyRoleSet(["school"]), addClass);

router.get('/subjects', authenticate, verifyRoleSet(["school"]), getSubjects);


module.exports = router;