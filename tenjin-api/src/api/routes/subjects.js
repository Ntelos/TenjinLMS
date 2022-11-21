const router = require('express').Router();
const  { getAssignments, addAssignment } = require('../controllers/subjectsController')

router.get('/:subjectId/assignments', getAssignments);
router.post('/:subjectId/assignments', addAssignment);


module.exports = router;