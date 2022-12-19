const router = require('express').Router();
const  { authenticate, verifyRoleSet } = require('../middlewares/verifyToken');
const  { addTeacher, getTeacher, getSchools, getSubjects, getAssignmentsOfSubject, addAssignmentToSubject } = require('../controllers/teacherController');

router.post('/', addTeacher);
router.get('/', authenticate, verifyRoleSet(["teacher"]), getTeacher);
router.get('/schools', authenticate, verifyRoleSet(["teacher"]), getSchools);
router.get('/subjects', authenticate, verifyRoleSet(["teacher"]), getSubjects);
router.get('/subjects/:subjectId/assignments', authenticate, verifyRoleSet(["teacher"]), getAssignmentsOfSubject);
router.post('/subjects/:subjectId/assignments', authenticate, verifyRoleSet(["teacher"]), addAssignmentToSubject);


module.exports = router;