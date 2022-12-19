const router = require('express').Router();
const  { authenticate, verifyRoleSet } = require('../middlewares/verifyToken');
const  { login, getSchoolInfo, getTeacherInfo, addSubject, addSubjects } = require('../controllers/generalController');

router.post('/login', login);
router.get('/schools/:schoolId', getSchoolInfo);
router.get('/teachers/:teacherId', getTeacherInfo);
router.post('/subject', authenticate, verifyRoleSet(["school"]), addSubject);
router.post('/subjects', authenticate, verifyRoleSet(["school"]), addSubjects);


module.exports = router;