const router = require('express').Router();
const  { massPopulation, getAssignments, addAssignment } = require('../controllers/subjectsController')

router.post('/', massPopulation);
router.get('/:subjectId/assignments', getAssignments);
router.post('/:subjectId/assignments', addAssignment);


module.exports = router;