const router = require('express').Router();
const  { authenticate, verifyRoleSet } = require('../middlewares/verifyToken');
const  { login, getSchools, getSchoolInfo, getTeachers, getTeacherInfo, getSubjects, getSubjectInfo, addSubject, addSubjects } = require('../controllers/generalController');

router.post('/login', login);

router.get('/schools', getSchools);
router.get('/schools/:schoolId', getSchoolInfo);

router.get('/teachers', getTeachers);
router.get('/teachers/:teacherId', getTeacherInfo);

router.get('/subjects', getSubjects);
router.get('/subjects/:subjectId', getSubjectInfo);

router.post('/subject', authenticate, verifyRoleSet(["school"]), addSubject);
router.post('/subjects', authenticate, verifyRoleSet(["school"]), addSubjects);


module.exports = router;