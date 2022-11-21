const addTeacher = ((req, res) => {
    res.json("ToDo: Register a Teacher")
})

const getTeacher = ((req, res) => {
    res.json("ToDo: Get info of Teacher with id: " + req.params.teacherId)
})

const getSchools = ((req, res) => {
    res.json("ToDo: Get Schools where Teacher with id: " + req.params.teacherId + " is working")
})

const assignTeacherToSubject = ((req, res) => {
    res.json("ToDo: Assign Teacher with id: " + req.params.teacherId + " to Subject with id: " + "from body parameters")
})

const getSubjects = ((req, res) => {
    res.json("ToDo: Get Subjects that Teacher with id: " + req.params.teacherId + " is assigned to teach")
})


module.exports = {
    addTeacher, 
    getTeacher, 
    getSchools, 
    assignTeacherToSubject, 
    getSubjects
}