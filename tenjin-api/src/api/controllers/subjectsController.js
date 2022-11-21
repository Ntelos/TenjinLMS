const getAssignments = ((req, res) => {
    res.json("ToDo: Get Assignments of Subject with id: " + req.params.subjectId)
})

const addAssignment = ((req, res) => {
    res.json("ToDo: Add Assignment for Subject with id: " + req.params.subjectId)
})


module.exports = {
    getAssignments, addAssignment
}